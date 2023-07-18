// use std::{process::Stdio, io::{BufReader, BufRead}};

use crate::util::logger;

#[allow(unused)]
#[doc = "run a script or command through windows cmd and write output to a file,  
besides of dir, script or command and outdir, you can also 
pass a name to tag this script or command
"]
/**
 * `@param` dir - Where to execute the script
 * `@param` script - Where to write outputs
 */
pub fn run_script(dir: &str, script: &str, outdir: Option<&str>, name: Option<&str>) -> (){
  let mut log_path: &str;
  match outdir {
    Some(val)=> {
      log_path = val;
    }
    None => {
      log_path = "log.txt";
    }
  }
  let proces = std::process::Command::new("cmd")
  .current_dir(dir)
  .args(&["/c", "start", "/b", script, ">>", log_path])
  .output()
  .expect(&format!("failed to execute {}", name.unwrap_or("script")));

  logger::info(&format!("status: {}", proces.status));
  logger::info(&format!("stdout: {}", String::from_utf8_lossy(&proces.stdout)));
  logger::errorMsg(&format!("stderr: {}", String::from_utf8_lossy(&proces.stderr)));

  // let mut cmd = std::process::Command::new("cmd")
  // .current_dir(dir)
  // .args(&["/C",  script, ">>", log_path])
  // .stdout(Stdio::piped())
  // .spawn()
  // .expect(&format!("failed to execute {}", name.unwrap_or("script")));

  // let pid = cmd.id();
  // let status = cmd.wait().unwrap();

  // println!("pid: {}", pid);
  // println!("status: {}", status);

  // if let Some(stdout) = cmd.stdout {
  //   let reader = BufReader::new(stdout);
  //   for line in reader.lines() {
  //       if let Ok(line) = line {
  //           println!("stdout: {}", line);
  //       }
  //   }
  // }
}