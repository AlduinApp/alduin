use chrono::Utc;
use feed_rs::model::Entry;

#[derive(Debug, serde::Serialize)]
pub struct Article {
    pub id: String,
    pub title: String,
    pub content: String,
    pub date: String,
    pub read: bool,
}

impl From<Entry> for Article {
    fn from(entry: Entry) -> Self {
        let id = entry.id;
        let title = entry.title.unwrap().content;
        let content = entry.content.unwrap().body.unwrap();
        let date = entry.updated
            .unwrap_or_else(|| entry.published.unwrap_or_else(|| Utc::now()))
            .to_rfc3339();

        Article {
            id,
            title,
            content,
            date,
            read: false,
        }
    }
}
