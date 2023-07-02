#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct SyncRequest {
    pub feed_identifier: String,
    pub feed_link: String,
}
