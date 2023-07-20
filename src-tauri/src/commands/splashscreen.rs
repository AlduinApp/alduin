use tauri::{Manager, Window};

#[tauri::command]
pub async fn close_splashscreen(window: Window) {
    if let Some(splashscreen) = window.get_window("splashscreen") {
        splashscreen.close().unwrap();
    }
}

#[tauri::command]
pub async fn open_main_window(window: Window) {
    window.get_window("main").unwrap().show().unwrap();
}
