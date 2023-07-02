use crate::enums::feed_type::FeedType;
use crate::structs::article::Article;

#[derive(Debug, serde::Serialize)]
pub struct SyncResponse {
    pub identifier: String,
    #[serde(rename = "type")]
    pub feed_type: FeedType,
    pub articles: Vec<Article>
}
