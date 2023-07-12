use serde::{Deserialize, Serialize};

use super::Start;


#[derive(Deserialize, Serialize, Debug)]
pub struct ServiceConfig {
  pub name: String,
  pub desc: String,
  pub port: u32,
  pub start: Start,
  pub log: String
}