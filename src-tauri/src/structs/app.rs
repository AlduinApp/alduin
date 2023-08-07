use sqlx::{ SqlitePool};

pub struct AppState {
    pub db: std::sync::Mutex<Option<SqlitePool>>,
}
