#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod model;

mod cmd;
use cmd::{launch,kill};

mod util;
use util::logger;



use tauri::{CustomMenuItem, Menu, MenuItem, Submenu, Manager};
use std::{thread,time};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn close_splashscreen(window: tauri::Window) {
  // Close splashscreen
  if let Some(splashscreen) = window.get_window("splashscreen") {
    splashscreen.close().unwrap();
  }
  // Show main window
  window.get_window("main").unwrap().show().unwrap();
}

fn main() {
    let import_config = CustomMenuItem::new("import_config".to_string(), "导入配置");
    let file_menu = Submenu::new("文件", Menu::new().add_item(import_config).add_native_item(MenuItem::Copy)
    .add_native_item(MenuItem::Paste)
    .add_native_item(MenuItem::Separator)
    .add_native_item(MenuItem::Minimize)
    .add_native_item(MenuItem::Hide)
    .add_native_item(MenuItem::CloseWindow)
    .add_native_item(MenuItem::Quit));
    let quit = CustomMenuItem::new("quit".to_string(), "退出");
    let close = CustomMenuItem::new("close".to_string(), "关闭");
    let submenu = Submenu::new("帮助", Menu::new().add_item(quit).add_item(close));
    let menu = Menu::new()
    .add_item(CustomMenuItem::new("project", "项目"))
    .add_submenu(file_menu)
    .add_item(CustomMenuItem::new("edit", "编辑"))
    .add_submenu(submenu);
    tauri::Builder::default()
        .setup(|app| {
          let splashscreen_window = app.get_window("splashscreen").unwrap();
          let main_window = app.get_window("main").unwrap();
          // we perform the initialization code on a new task so the app doesn't freeze
          tauri::async_runtime::spawn(async move {
            // initialize your app here instead of sleeping :)
            logger::console("Initializing...");
            std::thread::sleep(std::time::Duration::from_secs(1));
            logger::console("Done initializing.");

            // After it's done, close the splashscreen and display the main window
            thread::sleep(time::Duration::from_millis(0));
            splashscreen_window.close().unwrap();
            main_window.show().unwrap();
          });
          Ok(())
        })
        .invoke_handler(tauri::generate_handler![
          close_splashscreen,
          greet,
          launch,
          kill])
        .menu(menu)
        .on_menu_event(|event| {
            match event.menu_item_id() {
              "quit" => {
                std::process::exit(0);
              }
              "close" => {
                event.window().close().unwrap();
              }
              _ => {
                let str = format!("Click {}",event.menu_item_id());
                println!("{}", str);
              }
            }
          })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
