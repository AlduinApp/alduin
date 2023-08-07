// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod commands;
pub mod structs;
pub mod enums;
pub mod database;

use std::fs;
use sqlx::SqlitePool;
use commands::fetcher::{sync, sync_all};
use commands::splashscreen::{close_splashscreen, open_main_window};
use structs::single_instance_payload::SingleInstancePayload;
use tauri::{generate_handler, generate_context, Manager, Builder, SystemTray, SystemTrayEvent, SystemTrayMenu, CustomMenuItem, AppHandle, Wry};
use tauri::async_runtime::block_on;
use tauri_plugin_autostart::MacosLauncher;
use tauri_plugin_window_state::StateFlags;
use crate::database::load_migrations;

fn show_main_window(app: &AppHandle<Wry>) {
    let window = app.get_window("main").unwrap();
    window.show().unwrap();
}

fn fully_close_app(app: &AppHandle<Wry>) {
    let window = app.get_window("main").unwrap();
    window.close().unwrap();
}

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let show = CustomMenuItem::new("show".to_string(), "Show Alduin");

    let tray_menu = SystemTrayMenu::new()
        .add_item(show)
        .add_item(quit);
    let system_tray = SystemTray::new()
        .with_menu(tray_menu);

    let mut flags = StateFlags::all();
    flags.remove(StateFlags::VISIBLE);

    Builder::default()
        .plugin(tauri_plugin_window_state::Builder::default()
            .with_state_flags(flags)
            .build())
        .plugin(tauri_plugin_sql::Builder::default().add_migrations("sqlite:alduin.db", load_migrations()).build())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_autostart::init(MacosLauncher::LaunchAgent, Some(vec!["--autostart"])))
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
            app.emit_all("single-instance", SingleInstancePayload { args: argv, cwd }).unwrap();
        }))
        .invoke_handler(generate_handler![sync, sync_all, close_splashscreen, open_main_window])
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::DoubleClick {
                position: _,
                size: _,
                ..
            } => {
                show_main_window(app)
            }
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    fully_close_app(app)
                }
                "show" => {
                    show_main_window(app)
                }
                _ => {}
            },
            _ => {}
        })
        .setup(|app| {
             block_on(async move {
                 let handle = app.handle();

                 let app_dir = handle.path_resolver().app_data_dir().expect("failed to get app data dir");
                 fs::create_dir_all(&app_dir).expect("failed to create app data dir");
                 let sqlite_path = app_dir.join("alduin.db").to_string_lossy().to_string();

                 let db = SqlitePool::connect(sqlite_path.as_str()).await.expect("failed to connect to sqlite");
                 app.manage(db);

                 Ok(())
            })
        })
        .run(generate_context!())
        .expect("error while running tauri application");
}

