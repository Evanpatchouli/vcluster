use async_trait::async_trait;
use serde::{Deserialize, Serialize};

use crate::{RB, interface::crud::Crud};

use super::Start;

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct ServiceConfig {
  pub id: Option<String>,
  pub cluster_id: Option<String>,
  pub name: Option<String>,
  pub desc: Option<String>,
  pub port: Option<u32>,
  pub start: Option<Start>,
  pub log: Option<String>
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct SubApp {
  pub id: Option<String>,
  pub cluster_id: Option<String>,
  pub name: Option<String>,
  pub desc: Option<String>,
  pub port: Option<u32>,
  pub path: Option<String>,
  pub start_script: Option<String>,
  pub log: Option<String>
}

rbatis::crud!(SubApp{}, "subapp");

#[async_trait]
#[allow(unused_must_use)]
impl Crud<SubApp, SubApp> for SubApp {
  async fn sel_by_pk(pk: &str) -> Option<SubApp> {
    let rb = RB.clone();
    let sql = format!("SELECT * FROM `subapp` WHERE id={:?}", pk);
    return rb.query_decode::<Option<SubApp>>(&sql, vec![]).await.unwrap();
  }

  async fn sel_all() -> Option<Vec<SubApp>> {
    let rb = RB.clone();
    let sql = format!("SELECT * FROM `subapp`");
    return rb.query_decode::<Option<Vec<SubApp>>>(&sql, vec![]).await.unwrap();
  }

  async fn ins(subapp: &mut SubApp) {
    let rb = RB.clone();
    subapp.id = Some(rbatis::snowflake::new_snowflake_id().to_string());
    SubApp::insert(&mut &rb, &subapp).await;
  }

  async fn del_by_pk(pk: &str) {
    let rb = RB.clone();
    SubApp::delete_by_column(&mut &rb, "id", pk).await;
  }

  fn schema() -> SubApp {
    Self { id: None, cluster_id: None, name: None, desc: None, port: None, path: None, start_script: None, log: None }
  }
}

#[allow(dead_code,unused_variables,unused_must_use)]
impl SubApp {
  async fn sel_by_cluster(val: &str) -> Option<Vec<SubApp>> {
    SubApp::sel_by_key("cluster_id", val).await
  }

  async fn sel_by_key<T: std::fmt::Debug>(key: &str, val: T) -> Option<Vec<SubApp>> {
    let rb = RB.clone();
    let sql = format!("SELECT * FROM `subapp` WHERE {}={:?}", key, val);
    return rb.query_decode::<Option<Vec<SubApp>>>(&sql, vec![]).await.unwrap();
  }

  async fn del_by_cluster_id(cluster_id: &str) {
    let rb = RB.clone();
    SubApp::delete_by_column(&mut &rb, "cluster_id", cluster_id).await;
  }
}

#[allow(dead_code,unused_variables)]
impl ServiceConfig {
  pub fn inject_by_record(record: SubApp) -> Self {
    Self {
      id: record.id,
      cluster_id: record.cluster_id,
      name: record.name,
      desc: record.desc,
      port: record.port,
      start: Some(Start { path: record.path, script: record.start_script }),
      log: record.log }
  }

  pub fn to_subapp(&self) -> SubApp {
    let self_copy = self.clone();
    SubApp { 
      id: self_copy.id, 
      cluster_id: self_copy.cluster_id, 
      name: self_copy.name, 
      desc: self_copy.desc, 
      port: self_copy.port, 
      path: self_copy.start.clone().unwrap().path,
      start_script: self_copy.start.clone().unwrap().script, 
      log: self_copy.log }
  }

  pub async fn sel_by_key<T: std::fmt::Debug>(key: &str, val: T) -> Option<Vec<ServiceConfig>> {
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

  pub async fn del_by_cluster_id(cluster_id: &str) {
    SubApp::del_by_cluster_id(cluster_id).await;
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

  async fn sel_all() -> Option<Vec<ServiceConfig>>  {
    let records_wrap = SubApp::sel_all().await;
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

  async fn ins(service: &mut ServiceConfig) {
    let subapp = &mut service.to_subapp();
    SubApp::ins(subapp).await;
  }

  async fn del_by_pk(pk: &str) {
    SubApp::del_by_pk(pk).await;
  }

  fn schema() {}
}

#[allow(dead_code)]
impl ServiceConfig {
  pub async fn sel_by_cluster(val: &str) -> Option<Vec<ServiceConfig>> {
    ServiceConfig::sel_by_key("cluster_id", val).await
  }
}