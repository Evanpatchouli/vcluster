use async_trait::async_trait;
use serde::{Deserialize, Serialize};
use crate::{interface::crud::Crud, RB};

use super::ServiceConfig;

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct PkgConfig {
  pub id: Option<String>,
  pub name: Option<String>,
  pub desc: Option<String>,
  pub apps: Option<Vec<ServiceConfig>>
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Cluster {
  pub id: Option<String>,
  pub name: Option<String>,
  pub desc: Option<String>
}

#[async_trait]
impl Crud<Cluster,Cluster> for Cluster {
  async fn sel_by_pk(pk: &str) -> Option<Cluster>  {
    let rb = RB.clone();
    let sql = format!("SELECT * FROM `cluster` WHERE id={:?}", pk);
    return rb.query_decode::<Option<Cluster>>(&sql, vec![]).await.unwrap();
  }

  fn schema() -> Cluster {
    Cluster { id: None, name: None, desc: None }
  }
}

impl Cluster {
  #[allow(dead_code,unused_variables)]
  async fn sel_by_key<T: std::fmt::Debug>(key: &str, val: T) -> Option<Vec<Cluster>> {
    let rb = RB.clone();
    let sql = format!("SELECT * FROM `cluster` WHERE {}={:?}", key, val);
    let rs = rb.query_decode::<Option<Vec<Cluster>>>(&sql, vec![]).await.unwrap();
    return rs;
  }
}

#[async_trait]
impl Crud<PkgConfig, ()> for PkgConfig {
  async fn sel_by_pk(pk: &str) -> Option<PkgConfig> {
    let rb = RB.clone();
    let sql = format!("SELECT * FROM `cluster` WHERE id={:?}", pk);
    return rb.query_decode::<Option<PkgConfig>>(&sql, vec![]).await.unwrap();
  }

  fn schema() {}
}

impl PkgConfig {
  #[allow(dead_code,unused_variables)]
  async fn sel_by_key<T: std::fmt::Debug>(key: &str, val: T) -> Option<Vec<PkgConfig>>  {
    let rb = RB.clone();
    let sql = format!("SELECT * FROM `cluster` WHERE {}={:?}", key, val);
    return rb.query_decode::<Option<Vec<PkgConfig>>>(&sql, vec![]).await.unwrap();
  }
}
