use std::error::Error;
use super::date_util::now_time;

#[doc = r#"Current log level: default value is "INFO""#]
const LOG_LEVEL: &str = "INFO";
#[doc = r#"The quene of log levels: \["DEBUG", "INFO", "WARN", "ERROR"\]"#]
const LEG_QUEUE:[&str; 5] = ["DEBUG", "INFO", "WARN", "ERROR", "ALL"];

#[allow(unused)]
#[doc = r#"Ignore log level, just print msg into console"#]
pub fn console(msg: &str) {
    println!("[logger] {}", msg);
}

#[allow(unused)]
#[doc = r#"Info level log, receive a message"#]
pub fn info(msg: &str) {
    let islog = LEG_QUEUE.iter().position(|&lv|lv=="INFO").unwrap() 
    >= LEG_QUEUE.iter().position(|&lv|lv==LOG_LEVEL).unwrap();
    if islog {
        println!("[logger]{}[INFO] {}",now_time(), msg); 
    }
}

#[allow(unused)]
#[doc = r#"Debug level log, receive a message"#]
pub fn debug(msg: &str) {
    let islog = LEG_QUEUE.iter().position(|&lv|lv=="DEBUG").unwrap() 
    >= LEG_QUEUE.iter().position(|&lv|lv==LOG_LEVEL).unwrap();
    if islog {
        println!("[logger]{}[DEBUG] {}",now_time(), msg); 
    }
}

#[allow(unused,non_snake_case)]
#[doc = r#"Warnning level log, receive a message"#]
pub fn warn(msg: &str) {
    let islog = LEG_QUEUE.iter().position(|&lv|lv=="WARN").unwrap() 
    >= LEG_QUEUE.iter().position(|&lv|lv==LOG_LEVEL).unwrap();
    if islog {
        println!("[logger]{}[WARN] {}",now_time(), msg); 
    }
}

#[allow(unused,non_snake_case)]
#[doc = r#"Error level log, receive an error message"#]
pub fn errorMsg(msg: &str) {
    let islog = LEG_QUEUE.iter().position(|&lv|lv=="ERROR").unwrap() 
        >= LEG_QUEUE.iter().position(|&lv|lv==LOG_LEVEL).unwrap();
    if islog {
        println!("[logger]{}[ERROR] {}",now_time(), msg); 
    }
}

#[allow(unused)]
#[doc = r#"Error level log, receive an error"#]
pub fn error(err: &dyn Error) {
    let islog = LEG_QUEUE.iter().position(|&lv|lv=="ERROR").unwrap() 
    >= LEG_QUEUE.iter().position(|&lv|lv==LOG_LEVEL).unwrap();
    if islog {
        println!("[logger]{}[ERROR] {}",now_time(), err.to_string()); 
    }
}