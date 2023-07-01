#[derive(Debug, serde::Serialize)]
pub struct Article {
    pub id: String,
    pub title: String,
    pub content: String,
    pub date: String,
    pub link: String,
    pub read: bool,
}
