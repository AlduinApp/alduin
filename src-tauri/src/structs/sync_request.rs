#[derive(Debug, serde::Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SyncRequest {
    pub feed_identifier: String,
    pub feed_link: String,
}
