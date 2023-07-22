use std::{env::current_dir, process::Command};

use crate::{util::logger, model::{PkgConfig, resp::{Resp, self}}, interface::crud::Crud};

/**
 * 这个指令需要传递欲关闭的端口号，如: 8080
 */
#[tauri::command]
pub fn kill(port: u32) -> Resp<'static, ()> {
  kill_port(port);
  return resp::ok("Done", 1);
}

#[allow(unused)]
#[doc = "Launch a group of apps. You should pass pkg config json file path"]
#[tauri::command]
/**
 * **`Tauri command`**
 * `@param` pkg_config - json file path
 */
pub async fn stop_pkg_by_id(id: String) -> Resp<'static, ()>{
  logger::info(&format!("Launch a cluster of {:?}", id));
  let config_wrap: Option<PkgConfig> = PkgConfig::sel_by_pk(&id).await;
  match config_wrap {
    Some(config) => {
      for app in config.apps.unwrap().iter() {
        kill_port(app.port.unwrap())
      }
      return resp::ok("Done", 1);
    }
    None => resp::fail("This cluster is not exist", -1)
  }
}

pub fn kill_port(port: u32) {
  logger::info(&format!("Try shutting the port {} down...", &port.to_string()));
  let assets_dir = format!("{}\\assets", current_dir().unwrap().to_str().unwrap());
  let proces = Command::new("cmd")
  .current_dir(assets_dir)
  .args(&["/C", "kill.bat", &port.to_string(), ">> kill.log"])
  .output()
  .expect(&format!("failed to kill the port of {}", port));

  logger::info(&format!("status: {}", proces.status));
  logger::info(&format!("stdout: {}", String::from_utf8_lossy(&proces.stdout)));
  let err = String::from_utf8_lossy(&proces.stderr);
  if !err.is_empty() {
    logger::errorMsg(&format!("stderr: {:?}", err));
  }
}