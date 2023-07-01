use std::str::FromStr;
use rss::Channel;
use atom_syndication::Feed;
use crate::structs::article::Article;
use reqwest::blocking::Client;
use reqwest::redirect::Policy;
use crate::enums::feed_type::FeedType;

#[tauri::command]
pub fn sync(feed_link: &str) -> Vec<Article> {

    let (content, content_type) = match fetch_feed(feed_link) {
        Ok((content, content_type)) => (content, content_type),
        Err(_) => return vec![],
    };

    return if content_type.contains("application/rss+xml") || content_type.contains("text/xml") {
        match parse_rss(content) {
            Ok(articles) => articles,
            Err(e) => {
                eprintln!("Error parsing atom feed: {}", e);
                vec![]
            },
        }
    } else if content_type.contains("application/atom+xml") {
        match parse_atom(content) {
            Ok(articles) => articles,
            Err(e) => {
                eprintln!("Error parsing atom feed: {}", e);
                vec![]
            },
        }
    } else {
        vec![]
    }
}

fn fetch_feed(feed_link: &str) -> Result<(String, String), Box<dyn std::error::Error>> {
    let client = Client::builder()
        .user_agent("Alduin 3.0.0")
        .redirect(Policy::limited(2))
        .build()?;

    let response = client.get(feed_link).send()?;
    let content_type = response.headers().get("content-type").unwrap().to_str()?.to_string();
    let text = response.text()?;

    Ok((text, content_type))
}

fn parse_rss(content: String) -> Result<Vec<Article>, Box<dyn std::error::Error>> {
    let channel = Channel::from_str(&content)?;
    let articles = channel.items.iter().map(|item| {
        Article {
            id: item.guid().unwrap().value.to_string(),
            title: item.title().unwrap_or_default().to_string(),
            content: item.description().unwrap_or_default().to_string(),
            date: item.pub_date().unwrap().to_string(),
            link: item.link().unwrap_or_default().to_string(),
            feed_type: FeedType::RSS,
            read: false,
        }
    }).collect::<Vec<_>>();
    Ok(articles)
}

fn parse_atom(content: String) -> Result<Vec<Article>, Box<dyn std::error::Error>> {
    let feed = Feed::from_str(&content)?;
    let articles = feed.entries.iter().map(|entry| {
        Article {
            id: entry.id().to_string(),
            title: entry.title().to_string(),
            content: entry.summary().unwrap().value.to_string(),
            date: entry.published().unwrap().to_rfc2822(),
            link: entry.links()[0].href().to_string(),
            feed_type: FeedType::Atom,
            read: false,
        }
    }).collect::<Vec<Article>>();

    Ok(articles)
}
