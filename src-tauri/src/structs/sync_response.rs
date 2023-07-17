use serde::Serialize;
use crate::enums::feed_type::FeedType;
use crate::structs::article::Article;
use crate::structs::image::Image;

#[derive(Debug, Serialize)]
pub struct SyncResponse {
    pub identifier: String,
    #[serde(rename = "type")]
    pub feed_type: FeedType,
    pub articles: Vec<Article>,
    pub image: Option<Image>
}
