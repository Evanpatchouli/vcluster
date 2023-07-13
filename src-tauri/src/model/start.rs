use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Start {
  pub path: Option<String>,
  pub script: Option<String>
}