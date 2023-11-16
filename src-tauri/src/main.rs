#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
mod model;
mod interface;

mod cmd;
use cmd::{launch_pkg,launch_pkg_by_id,kill,create_cluster,
  getall_cluster,del_cluster_by_pk,del_app_by_pk,launch_app_by_id,
  stop_pkg_by_id,sql,create_app};

mod store;

mod util;
use util::logger;

extern crate rbatis;
use rbatis::RBatis;
use rbdc_sqlite::driver::SqliteDriver;

#[macro_use]
extern crate lazy_static;

lazy_static! {
  // Rbatis类型变量 RB，用于数据库查询
  static ref RB: RBatis = RBatis::new();
}



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

#[tauri::command]
fn front_msg(window: tauri::Window) {
  window.emit_all("back-msg", Payload { message: "Tauri is awesome!".into() }).unwrap();
}

#[derive(Clone, serde::Serialize)]
struct Payload {
  message: String,
}

#[tokio::main]
async fn main() {
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
          app.emit_all("back-msg", Payload { message: "Tauri is awesome!".into() }).unwrap();
          let splashscreen_window = app.get_window("splashscreen").unwrap();
          let main_window = app.get_window("main").unwrap();
          // we perform the initialization code on a new task so the app doesn't freeze
          tauri::async_runtime::spawn(async move {
            // initialize your app here instead of sleeping :)
            logger::console("Initializing...");
            RB.init(SqliteDriver{},"sqlite:vcluster.db").unwrap();
            util::init().await;
            std::thread::sleep(std::time::Duration::from_secs(1));
            logger::console("Done initializing.");

            // After it's done, close the splashscreen and display the main window
            thread::sleep(time::Duration::from_millis(1000));
            splashscreen_window.close().unwrap();
            main_window.show().unwrap();
          });
          Ok(())
        })
        .invoke_handler(tauri::generate_handler![
          front_msg,
          close_splashscreen,
          greet,
          create_cluster,
          getall_cluster,
          del_cluster_by_pk,
          del_app_by_pk,
          launch_pkg,
          launch_pkg_by_id,
          store::state::get,
          launch_app_by_id,
          stop_pkg_by_id,
          sql,
          kill,
          create_app
          ])
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
        .plugin(tauri_plugin_store::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running vcluster");
}
