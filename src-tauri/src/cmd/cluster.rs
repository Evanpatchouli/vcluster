use crate::{model::{resp::{Resp, self}, PkgConfig}, interface::crud::Crud};

#[allow(dead_code,unused_variables)]
#[tauri::command]
pub async fn create_cluster(pkg: Option<PkgConfig>) -> Resp<'static, ()>{
  match pkg {
    Some(mut pkg) => {
      match pkg.apps.clone() {
        Some(apps) => {
          if apps.len() == 0 {
            return resp::fail("empty sub-apps", -2)
          }
          PkgConfig::ins(&mut pkg).await;
          return resp::ok("create pkg success", 1);
        }
        None => resp::fail("empty sub-apps", -2)
      }  
    }
    None => resp::fail("Empty pkgconfig", -1)
  }
}

#[allow(dead_code,unused_variables)]
#[tauri::command]
pub async fn getall_cluster() -> Resp<'static, Option<Vec<PkgConfig>>>{
  let pkgs = PkgConfig::sel_all().await;
  return resp::ok_data("query all pkgs success", 1, pkgs);
}

#[allow(dead_code,unused_variables)]
#[tauri::command]
pub async fn del_cluster_by_pk(pk: String) -> Resp<'static, ()>{
  PkgConfig::del_by_pk(&pk).await;
  return resp::ok("delete a pkg success", 1);
}
