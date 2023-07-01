#[derive(Debug, serde::Serialize)]
#[serde(rename_all = "lowercase")]
pub enum FeedType {
    RSS,
    Atom,
}
