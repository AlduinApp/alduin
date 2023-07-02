// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod commands;
pub mod structs;
pub mod enums;

use commands::fetcher::{sync, sync_all};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![sync, sync_all])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
