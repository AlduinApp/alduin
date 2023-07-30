#[derive(Clone, serde::Serialize)]
pub struct SingleInstancePayload {
    pub args: Vec<String>,
    pub cwd: String,
}
