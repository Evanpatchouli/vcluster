use serde::{Deserialize, Serialize};

#[allow(dead_code,unused_variables)]
#[derive(Deserialize, Serialize, Debug)]
pub struct Resp<'a, T> {
  pub ok: bool,
  pub code: i32,
  pub r#type: Option<i32>,
  pub msg: &'a str,
  pub data: T
}

#[allow(dead_code,unused_variables)]
pub fn ok<'a>(msg: &'a str, code: i32) -> Resp<'a,()> {
  Resp { ok: true, code, r#type: Some(200), msg, data: () }
}

#[allow(dead_code,unused_variables)]
pub fn ok_data<'a, T>(msg: &'a str, code: i32, data: T) -> Resp<'a,T> {
  Resp { ok: true, code, r#type: Some(200), msg, data }
}

#[allow(dead_code,unused_variables)]
pub fn fail<'a>(msg: &'a str, code: i32) -> Resp<'a,()> {
  Resp { ok: false, code, r#type: Some(400), msg, data: () }
}

#[allow(dead_code,unused_variables)]
pub fn fail_data<'a, T>(msg: &'a str, code: i32, data: T) -> Resp<'a,T> {
  Resp { ok: false, code, r#type: Some(400), msg, data }
}