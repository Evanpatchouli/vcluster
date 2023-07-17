use std::fs;

use crate::{model::{PkgConfig, resp::{Resp, self}}, cmd::run_script, util::logger, interface::crud::Crud};

#[allow(unused)]
#[doc = "Launch a group of apps. You should pass pkg config json file path"]
#[tauri::command]
/**
 * **`Tauri command`**
 * `@param` pkg_config - json file path
 */
pub fn launch_pkg(pkg_config_path: &str) {
  dbg!(pkg_config_path);
  logger::info("Launch a cluster of apps");
  let config: PkgConfig = {
    let data = fs::read_to_string(pkg_config_path).unwrap();
    serde_json::from_str(&data).unwrap()
  };
  dbg!(&config);
  for app in config.apps.unwrap().iter() {
    run_script(&app.start.clone().unwrap().path.unwrap(), &app.start.clone().unwrap().script.unwrap(), Some(&app.log.clone().unwrap()), Some(&app.name.clone().unwrap()));
  }
}

#[allow(unused)]
#[doc = "Launch a cluster of certain id. You should pass the id of one cluster"]
#[tauri::command]
pub async fn launch_pkg_by_id(pkg_id: String) -> Resp<'static, ()>{
  logger::info(&format!("Launch a cluster of {:?}", pkg_id));
  let config_wrap: Option<PkgConfig> = PkgConfig::sel_by_pk(&pkg_id).await;
  match config_wrap {
    Some(config) => {
      for app in config.apps.unwrap().iter() {
        run_script(&app.start.clone().unwrap().path.unwrap(), &app.start.clone().unwrap().script.unwrap(), Some(&app.log.clone().unwrap()), Some(&app.name.clone().unwrap()));
      }
      return resp::ok("Done", 1);
    }
    None => resp::fail("This cluster is not exist", -1)
  }
}