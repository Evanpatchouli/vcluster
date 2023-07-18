use std::fs;

use crate::{model::{PkgConfig, resp::{Resp, Resp2,self}, ServiceConfig}, cmd::run_script, util::logger, interface::crud::Crud};

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
        run_app(&app.start.clone().unwrap().path.unwrap(), &app.start.clone().unwrap().script.unwrap(), Some(&app.log.clone().unwrap()), Some(&app.name.clone().unwrap()));
      }
      return resp::ok("Done", 1);
    }
    None => resp::fail("This cluster is not exist", -1)
  }
}

#[allow(unused)]
#[doc = "Launch a cluster of certain id. You should pass the id of one cluster"]
#[tauri::command]
pub async fn launch_app_by_id(app_id: String) -> Resp2<()>{
  logger::info(&format!("Launch a subapp of {:?}", app_id));
  let app_wrap: Option<ServiceConfig> = ServiceConfig::sel_by_pk(&app_id).await;
  match app_wrap {
    Some(app) => {
      let result = run_app(&app.start.clone().unwrap().path.unwrap(), &app.start.clone().unwrap().script.unwrap(), Some(&app.log.clone().unwrap()), Some(&app.name.clone().unwrap()));
      if (!result.ok) {
        return resp::fail2(result.msg, -2);
      }
      return resp::ok2("Done".to_owned(), 1);
    }
    None => resp::fail2("This subapp is not exist".to_owned(), -1)
  }
}

#[allow(unused)]
#[doc = "Launch a subapp of certain id. You should pass the id of one cluster"]
#[tauri::command]
pub fn run_app<'a>(dir: &'a str, script: &'a str, outdir: Option<&'a str>, name: Option<&'a str>) -> Resp2<()>{
  let mut log_path: &str;
  match outdir {
    Some(val)=> {
      log_path = val;
    }
    None => {
      log_path = "log.txt";
    }
  }
  println!("{}", format!("cmd /c start /b {} >> {}", script, log_path));
  let proces = std::process::Command::new("cmd")
  .current_dir(dir)
  .args(&["/c", script, ">>", log_path])
  // .args(&["/c", "start", "/b", script, ">>", log_path])
  .output()
  .expect(&format!("failed to execute {}", name.unwrap_or("script")));

  logger::info(&format!("status: {}", proces.status));
  logger::info(&format!("stdout: {}", String::from_utf8_lossy(&proces.stdout)));
  let stderr: String = String::from_utf8_lossy(&proces.stderr).to_string();
  if &stderr!="" {
    logger::errorMsg(&format!("stderr: {}", &stderr));
    return resp::fail2(stderr.clone(), -1);
  }
  return resp::ok2("success".to_owned(), 1);
  
}