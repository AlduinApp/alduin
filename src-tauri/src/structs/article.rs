use chrono::Utc;
use feed_rs::model::Entry;
use serde::Serialize;
use crate::structs::image::Image;

#[derive(Debug, Serialize)]
pub struct Article {
    pub id: String,
    pub title: String,
    pub content: String,
    pub date: String,
    pub read: bool,
    pub image: Option<Image>
}

impl From<Entry> for Article {
    fn from(entry: Entry) -> Self {
        let id = entry.id;
        let title = match entry.title {
            Some(t) => t.content,
            None => String::from("No title found, please report this issue."),
        };
        let content = match entry.content {
            Some(c) => c.body.unwrap(),
            None => match entry.summary {
                Some(s) => s.content,
                None => String::from("No content found, please report this issue."),
            },
        };

        let date = entry.published
            .unwrap_or_else(|| entry.updated.unwrap_or_else(|| Utc::now()))
            .to_rfc3339();



        let image = if entry.media.is_empty() {
            None
        } else {
            let media = entry.media.iter().filter(|m| !m.thumbnails.is_empty()).next();
            match media {
                Some(m) => {
                    let thumbnail = m.thumbnails.iter().next();
                    match thumbnail {
                        Some(t) => Some(Image::from(t.image.clone())),
                        None => None
                    }
                },
                None => None
            }
        };

        Article {
            id,
            title,
            content,
            date,
            read: false,
            image,
        }
    }
}
