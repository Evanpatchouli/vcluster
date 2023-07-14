pub mod date_util;

#[doc = r#"Logger tool, with log level of `"DEBUG"`, `"INFO"`, `"WARN"`, `"ERROR"`"#]
pub mod logger;

mod init;
pub use init::main as init;