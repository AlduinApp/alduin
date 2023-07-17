use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct Image {
    pub uri: String,
    pub title: Option<String>,
    pub width: Option<u32>,
    pub height: Option<u32>,
    pub description: Option<String>,
}

impl From<feed_rs::model::Image> for Image {
    fn from(image: feed_rs::model::Image) -> Self {
        Image {
            uri: image.uri,
            title: image.title,
            width: image.width,
            height: image.height,
            description: image.description,
        }
    }
}
