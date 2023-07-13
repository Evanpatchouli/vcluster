use crate::model::{resp::{Resp, self}, PkgConfig};

#[allow(dead_code,unused_variables)]
#[tauri::command]
pub fn create_cluster(pkg: PkgConfig) -> Resp<'static, ()>{
  return resp::ok("ceshi", 1);
}