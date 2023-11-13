use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct AppApi {
  pub alive: Option<String>,
  pub start: Option<String>,
  pub stop: Option<String>,
  pub restart: Option<String>,
}