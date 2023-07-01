use std::str::FromStr;
use rss::Channel;
use atom_syndication::Feed;
use crate::structs::article::Article;
use reqwest::blocking::Client;
use reqwest::redirect::Policy;
use crate::enums::feed_type::FeedType;
use crate::structs::sync_response::SyncResponse;

#[tauri::command]
pub fn sync(feed_identifier: &str, feed_link: &str) -> Result<SyncResponse, String> {
    let (content, content_type) = match fetch_feed(feed_link) {
        Ok((content, content_type)) => (content, content_type),
        Err(_) => return Err("Error fetching feed".to_string()),
    };

    return if content_type.contains("application/rss+xml") || content_type.contains("text/xml") {
        match parse_rss(content) {
            Ok(articles) => Ok(SyncResponse {
                identifier: feed_identifier.to_string(),
                feed_type: FeedType::RSS,
                articles,
            }),
            Err(e) => Err(format!("Error parsing rss feed: {}", e)),
        }
    } else if content_type.contains("application/atom+xml") {
        match parse_atom(content) {
            Ok(articles) => Ok(SyncResponse {
                identifier: feed_identifier.to_string(),
                feed_type: FeedType::Atom,
                articles,
            }),
            Err(e) => Err(format!("Error parsing atom feed: {}", e)),
        }
    } else {
        Err("Unsupported feed type".to_string())
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
            read: false,
        }
    }).collect::<Vec<Article>>();

    Ok(articles)
}
