use serde::{Deserialize, Serialize};
use super::ServiceConfig;

#[derive(Deserialize, Serialize, Debug)]
pub struct PkgConfig {
  pub name: String,
  pub desc: String,
  pub apps: Vec<ServiceConfig>
}