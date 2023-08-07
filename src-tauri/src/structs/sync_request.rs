#[derive(Debug, serde::Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SyncRequest {
    pub identifier: String,
    pub url: String,
}
