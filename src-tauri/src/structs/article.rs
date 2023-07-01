
use crate::enums::feed_type::FeedType;

#[derive(Debug, serde::Serialize)]
pub struct Article {
    pub id: String,
    pub title: String,
    pub content: String,
    pub date: String,
    pub link: String,
    #[serde(rename = "type")]
    pub feed_type: FeedType,
    pub read: bool,
}
