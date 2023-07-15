use std::{env::current_dir, process::Command};

use crate::util::logger;

/**
 * 这个指令需要传递欲关闭的端口号，如: 8080
 */
#[tauri::command]
pub fn kill(port: u16) {
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