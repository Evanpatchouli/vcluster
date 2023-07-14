use async_trait::async_trait;
use serde::{Deserialize, Serialize};
use crate::{interface::crud::Crud, RB};

use super::ServiceConfig;

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct PkgConfig {
  pub id: Option<String>,
  pub name: Option<String>,
  pub desc: Option<String>,
  pub apps: Option<Vec<ServiceConfig>>,
  pub file: Option<String>
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Cluster {
  pub id: Option<String>,
  pub name: Option<String>,
  pub desc: Option<String>,
  pub file: Option<String>
}

rbatis::crud!(Cluster{}, "cluster");

#[async_trait]
#[allow(unused_must_use)]
impl Crud<Cluster,Cluster> for Cluster {
  async fn sel_by_pk(pk: &str) -> Option<Cluster>  {
    let rb = RB.clone();
    let sql = format!("SELECT * FROM `cluster` WHERE id={:?}", pk);
    return rb.query_decode::<Option<Cluster>>(&sql, vec![]).await.unwrap();
  }

  async fn sel_all() -> Option<Vec<Cluster>>  {
    let rb = RB.clone();
    let sql = format!("SELECT * FROM `cluster`");
    return rb.query_decode::<Option<Vec<Cluster>>>(&sql, vec![]).await.unwrap();
  }

  async fn ins(cluster: &mut Cluster) {
    let rb = RB.clone();
    cluster.id = Some(rbatis::snowflake::new_snowflake_id().to_string());
    Cluster::insert(&mut &rb, &cluster).await;
  }

  async fn del_by_pk(pk: &str) {
    let rb = RB.clone();
    Cluster::delete_by_column(&mut &rb, "id", pk).await;
  }

  fn schema() -> Cluster {
    Cluster { id: None, name: None, desc: None, file: None }
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
#[allow(unused_must_use)]
impl Crud<PkgConfig, ()> for PkgConfig {
  async fn sel_by_pk(pk: &str) -> Option<PkgConfig> {
    let cluster_wrap = Cluster::sel_by_pk(pk).await;
    match cluster_wrap {
      Some(cluster) => {
        let mut pkg = PkgConfig::inject_by_cluster(cluster);
        let services = ServiceConfig::sel_by_cluster(&pkg.id.clone().unwrap()).await;
        pkg.apps = services;
        return Some(pkg);
      }
      None => None
    }
  }

  async fn ins(pkg: &mut PkgConfig) {
    let cluster = &mut pkg.to_cluster();
    Cluster::ins(cluster).await;
    for service in pkg.apps.clone().unwrap().iter() {
      let service = &mut service.clone();
      service.cluster_id = cluster.id.clone();
      ServiceConfig::ins(service).await;
    }
  }

  async fn del_by_pk(pk: &str) {
    ServiceConfig::del_by_cluster_id(pk).await;
    Cluster::del_by_pk(pk).await;
  }

  async fn sel_all() -> Option<Vec<PkgConfig>>  {
    let clusters_wrap = Cluster::sel_all().await;
    match clusters_wrap {
      Some(clusters)=>{
        let mut pkgs: Vec<PkgConfig> = vec![];
        for cluster in clusters  {
          let mut pkg = PkgConfig::inject_by_cluster(cluster);
          let services = ServiceConfig::sel_by_cluster(&pkg.id.clone().unwrap()).await;
          pkg.apps = services;
          pkgs.push(pkg);
        }
        return Some(pkgs);
      }
      None => None
    }
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

  fn inject_by_cluster(cluster: Cluster) -> Self {
    Self {
      id: cluster.id, 
      name: cluster.name, 
      desc: cluster.desc, 
      apps: None, file: cluster.file }
  }

  fn to_cluster(&self) -> Cluster {
    let self_copy = self.clone();
    Cluster { 
      id: self_copy.id, 
      name: self_copy.name, 
      desc: self_copy.desc, 
      file: self_copy.file 
    }
  }
}
