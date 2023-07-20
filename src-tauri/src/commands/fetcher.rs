use reqwest::blocking::Client;
use reqwest::redirect::Policy;
use crate::structs::sync_request::SyncRequest;
use crate::structs::sync_response::SyncResponse;
use feed_rs::parser;
use tauri::{AppHandle, Manager};
use crate::enums::feed_type::FeedType;
use crate::structs::article::Article;
use crate::structs::image::Image;

#[tauri::command]
pub fn sync(sync_request: SyncRequest, app_handle: AppHandle) -> Result<SyncResponse, String> {
    let SyncRequest { identifier, link } = sync_request;

    let content = match fetch_feed(link, app_handle) {
        Ok(content) => content,
        Err(_) => return Err("Error fetching feed".to_string()),
    };

    match parser::parse(content.as_bytes()) {
        Ok(feed) => Ok(SyncResponse {
            identifier,
            feed_type: FeedType::from(feed.feed_type),
            articles: feed.entries.into_iter().map(Article::from).collect(),
            // image is either feed.logo, feed.icon, or None
            image: match feed.logo {
                Some(l) => Some(Image::from(l)),
                None => match feed.icon {
                    Some(i) => Some(Image::from(i)),
                    None => None,
                }
            }
        }),
        Err(e) => Err(format!("Error parsing feed: {}", e)),
    }

}

#[tauri::command]
pub fn sync_all(sync_request: Vec<SyncRequest>, app_handle: AppHandle) -> Result<Vec<SyncResponse>, String> {
    let mut responses = Vec::new();

    for request in sync_request {
        let response = match sync(request, app_handle.app_handle()) {
            Ok(response) => response,
            Err(e) => return Err(e),
        };
        responses.push(response);
    }

    Ok(responses)
}

fn fetch_feed(feed_link: String, app_handle: AppHandle) -> Result<String, Box<dyn std::error::Error>> {
    let version = app_handle.package_info().version.to_string();
    let client = Client::builder()
        .user_agent(format!("Alduin v{}", version))
        .redirect(Policy::limited(2))
        .build()?;

    let response = client.get(feed_link).send()?;
    let text = response.text()?;

    Ok(text)
}
