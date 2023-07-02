use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "lowercase")]
pub enum FeedType {
    RSS,
    Atom,
    JSON
}

impl From<feed_rs::model::FeedType> for FeedType {
    fn from(feed_type: feed_rs::model::FeedType) -> Self {
        match feed_type {
            feed_rs::model::FeedType::Atom => FeedType::Atom,
            feed_rs::model::FeedType::JSON => FeedType::JSON,
            feed_rs::model::FeedType::RSS0 => FeedType::RSS,
            feed_rs::model::FeedType::RSS1 => FeedType::RSS,
            feed_rs::model::FeedType::RSS2 => FeedType::RSS,
        }
    }
}
