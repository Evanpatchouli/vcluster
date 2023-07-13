use async_trait::async_trait;
use serde::{Deserialize, Serialize};

use crate::{RB, interface::crud::Crud};

use super::Start;

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct ServiceConfig {
  pub id: Option<String>,
  pub name: Option<String>,
  pub desc: Option<String>,
  pub port: Option<u32>,
  pub start: Option<Start>,
  pub log: Option<String>
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct SubApp {
  pub id: Option<String>,
  pub name: Option<String>,
  pub desc: Option<String>,
  pub port: Option<u32>,
  pub path: Option<String>,
  pub start_script: Option<String>,
  pub log: Option<String>
}



#[async_trait]
impl Crud<SubApp, SubApp> for SubApp {
  async fn sel_by_pk(pk: &str) -> Option<SubApp> {
    let rb = RB.clone();
    let sql = format!("SELECT * FROM `subapp` WHERE id={:?}", pk);
    return rb.query_decode::<Option<SubApp>>(&sql, vec![]).await.unwrap();
  }

  // async fn sel_by_key(key: &str, val: T) -> Option<Vec<SubApp>> {
  //   let rb = RB.clone();
  //   let sql = format!("SELECT * FROM `subapp` WHERE {}={:?}", key, val);
  //   return rb.query_decode::<Option<Vec<SubApp>>>(&sql, vec![]).await.unwrap();
  // }

  fn schema() -> SubApp {
    Self { id: None, name: None, desc: None, port: None, path: None, start_script: None, log: None }
  }
}

#[allow(dead_code,unused_variables)]
impl SubApp {
  async fn sel_by_cluster(key: &str, val: &str) -> Option<Vec<SubApp>> {
    SubApp::sel_by_key(key, val).await
  }

  async fn sel_by_key<T: std::fmt::Debug>(key: &str, val: T) -> Option<Vec<SubApp>> {
    let rb = RB.clone();
    let sql = format!("SELECT * FROM `subapp` WHERE {}={:?}", key, val);
    return rb.query_decode::<Option<Vec<SubApp>>>(&sql, vec![]).await.unwrap();
  }
}

#[allow(dead_code,unused_variables)]
impl ServiceConfig {
  fn inject_by_record(record: SubApp) -> Self {
    Self {
      id: record.id,
      name: record.name,
      desc: record.desc,
      port: record.port,
      start: Some(Start { path: record.path, script: record.start_script }),
      log: record.log }
  }

  async fn sel_by_key<T: std::fmt::Debug>(key: &str, val: T) -> Option<Vec<ServiceConfig>> {
    let records_wrap = SubApp::sel_by_key(key, val).await;
    match records_wrap {
      Some(records)=>{
        let mut subapps: Vec<ServiceConfig> = vec![];
        for record in records  {
          subapps.push(ServiceConfig::inject_by_record(record));
        }
        return Some(subapps);
      }
      None => None
    }
  }
}

#[async_trait]
impl Crud<ServiceConfig, ()> for ServiceConfig {
  async fn sel_by_pk(pk: &str) -> Option<ServiceConfig>  {
    let subapp_wrap = SubApp::sel_by_pk(pk).await;
    match subapp_wrap {
      Some(subapp) => Some(ServiceConfig::inject_by_record(subapp)),
      None => None
    }
  }

  fn schema() {}
}