// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod commands;
pub mod structs;
pub mod enums;

use commands::fetcher::{sync, sync_all};
use commands::splashscreen::close_spashscreen;
use tauri::{generate_handler, generate_context, Builder};

fn main() {
    Builder::default()
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .invoke_handler(generate_handler![sync, sync_all, close_spashscreen])
        .run(generate_context!())
        .expect("error while running tauri application");
}
