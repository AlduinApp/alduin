use reqwest::blocking::Client;
use reqwest::redirect::Policy;
use crate::structs::sync_request::SyncRequest;
use crate::structs::sync_response::SyncResponse;
use feed_rs::parser;
use crate::enums::feed_type::FeedType;
use crate::structs::article::Article;

#[tauri::command]
pub fn sync(sync_request: SyncRequest) -> Result<SyncResponse, String> {
    let SyncRequest { feed_identifier, feed_link } = sync_request;

    let content = match fetch_feed(feed_link) {
        Ok(content) => content,
        Err(_) => return Err("Error fetching feed".to_string()),
    };

    match parser::parse(content.as_bytes()) {
        Ok(feed) => Ok(SyncResponse {
            identifier: feed_identifier,
            feed_type: FeedType::from(feed.feed_type),
            articles: feed.entries.into_iter().map(Article::from).collect(),
        }),
        Err(e) => Err(format!("Error parsing feed: {}", e)),
    }

}

#[tauri::command]
pub fn sync_all(sync_request: Vec<SyncRequest>) -> Result<Vec<SyncResponse>, String> {
    let mut responses = Vec::new();

    for request in sync_request {
        let response = match sync(request) {
            Ok(response) => response,
            Err(e) => return Err(e),
        };
        responses.push(response);
    }

    Ok(responses)
}

fn fetch_feed(feed_link: String) -> Result<String, Box<dyn std::error::Error>> {
    let client = Client::builder()
        .user_agent("Alduin 3.0.0")
        .redirect(Policy::limited(2))
        .build()?;

    let response = client.get(feed_link).send()?;
    let text = response.text()?;

    Ok(text)
}
