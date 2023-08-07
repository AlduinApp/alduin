use reqwest::redirect::Policy;
use crate::structs::sync_request::SyncRequest;
use crate::structs::sync_response::SyncResponse;
use feed_rs::parser;
use reqwest::Client;
use sqlx::{Pool, Sqlite};
use tauri::{AppHandle, Manager};
use crate::enums::feed_type::FeedType;
use crate::structs::article::Article;
use crate::structs::image::Image;
use xxhash_rust::xxh32::xxh32;

#[tauri::command]
pub async fn sync(sync_request: SyncRequest, app_handle: AppHandle) -> Result<(), String> {
    let SyncRequest { identifier, url } = sync_request;

    let content = fetch_feed(url, app_handle.clone()).await?;

    let response = match parser::parse(content.as_bytes()) {
        Ok(feed) => Ok(SyncResponse {
            identifier,
            feed_type: FeedType::from(feed.feed_type),
            articles: feed.entries.into_iter().map(Article::from).collect(),
            image: match feed.logo {
                Some(l) => Some(Image::from(l)),
                None => match feed.icon {
                    Some(i) => Some(Image::from(i)),
                    None => None,
                }
            }
        }),
        Err(e) => Err(format!("Error parsing feed: {}", e)),
    }.unwrap();

    let image_url = match response.image {
        Some(image) => Some(image.uri),
        None => None,
    };

    let pool = app_handle.state::<Pool<Sqlite>>();
    let update_feed_query = sqlx::query(include_str!("../database/queries/sync.sql"))
        .bind(match response.feed_type {
            FeedType::Atom => "atom",
            FeedType::RSS => "rss",
            FeedType::JSON => "json",
        })
        .bind(image_url)
        .bind(response.identifier.clone());

    update_feed_query.execute(&*pool).await.expect("Error executing query");

    for article in response.articles {
        let image_url = match article.image {
            Some(image) => Some(image.uri),
            None => None,
        };

        let insert_article_query = sqlx::query(include_str!("../database/queries/insert_article.sql"))
            .bind(xxh32(&[response.identifier.as_bytes(), article.id.as_bytes()].concat(), 42))
            .bind(response.identifier.clone())
            .bind(article.title)
            .bind(article.content)
            .bind(article.date)
            .bind(image_url);

        match insert_article_query.execute(&*pool).await {
            Ok(_) => Ok(()),
            // cast Error is a SqliteError
            Err(e) => match e.as_database_error() {
                // code() is a Cow<str>, so we need to match on &str
                Some(database_error) => match database_error.code().unwrap_or_default().to_string().as_str() {
                    "2067" => Ok(()),
                    "1555" => Ok(()),
                    _ => Err(format!("Error executing query: {}", e)),
                },
                None => Err(format!("Error executing query: {}", e)),
            },
        }?;
    }

    Ok(())
}

#[tauri::command]
pub async fn sync_all(sync_request: Vec<SyncRequest>, app_handle: AppHandle) -> Result<(), String> {
    for request in sync_request {
        sync(request, app_handle.clone()).await?;
    }
    Ok(())
}

async fn fetch_feed(feed_link: String, app_handle: AppHandle) -> Result<String, String> {
    let version = app_handle.package_info().version.to_string();
    let client = Client::builder()
        .user_agent(format!("Alduin v{}", version))
        .redirect(Policy::limited(2))
        .build().expect("Error building client");

    let response = client.get(feed_link).send().await.expect("Error fetching feed");
    let text = response.text().await.expect("Error reading response text");

    Ok(text)
}
