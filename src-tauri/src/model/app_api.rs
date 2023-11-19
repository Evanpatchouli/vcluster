use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Api {
  pub url: Option<String>,
  pub method: Option<String>
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct AppApi {
  pub alive: Api,
  pub start: Api,
  pub stop: Api,
  pub restart: Api,
}