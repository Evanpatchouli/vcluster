// use std::any::Any;

use crate::{util::logger, RB, model::resp::{self, Resp}};

#[allow(unused)]
#[doc = "execute a sql expression
"]
#[tauri::command]
/**
 * `@param` expression
 */
pub async fn sql(expression: String) -> Resp<'static, String> {
  let rb = RB.clone();
  let res = rb.query(&expression, vec![]).await;
  match res {
    Ok(exec_result) => {
      logger::info("executed successfully");
      // let data = Box::new(exec_result);
      return resp::ok_data("sql exec success", 1, exec_result.to_string());
    }
    Err(e) => {
      let err_msg = e.to_string().clone();
      // let data = Box::new(err_msg.clone());
      let message = format!("failed to execute: {:?}", err_msg.clone());
      logger::errorMsg(&format!("failed to execute: {:?}", message));
      return resp::fail_data("sql exec failed", 1, err_msg.clone());
    }
  }
}
