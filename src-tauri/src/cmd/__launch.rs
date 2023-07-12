use std::fs;

use crate::{model::PkgConfig, cmd::run_script, util::logger};

#[allow(unused)]
#[doc = "Launch a group of apps. You should pass pkg config json file path"]
#[tauri::command]
/**
 * **`Tauri command`**
 * `@param` pkg_config - json file path
 */
pub fn launch(pkg_config_path: &str) {
  dbg!(pkg_config_path);
  logger::info("Launch a cluster of apps");
  let config: PkgConfig = {
    let data = fs::read_to_string(pkg_config_path).unwrap();
    serde_json::from_str(&data).unwrap()
  };
  dbg!(&config);
  for app in config.apps.iter() {
    run_script(&app.start.path, &app.start.script, Some(&app.log), Some(&app.name));
  }
}