// #[allow(unused_imports)]
// use serde::{Deserialize, Serialize};
// use std::{process::Command, path::Path, Stdio};
// use std::io::{BufRead, BufReader, Write};
// use std::thread;

// lazy_static! {
//   static ref CURRENT_DIR: Option<&'static Path> = Command::new("cmd").get_current_dir();
//   static ref STATE:&'static mut CMD = Command::new("cmd").current_dir(CURRENT_DIR.clone().to_owned().unwrap());
// }

#[tauri::command]
pub fn get() -> Result<(), String> {
    // let mut child = Command::new("sh")
    //     .stdout(Stdio::piped())
    //     .stderr(Stdio::piped())
    //     .stdin(Stdio::piped())
    //     .spawn()
    //     .map_err(|e| e.to_string())?;

    // let mut stdout = child.stdout.take().unwrap();
    // let mut stderr = child.stderr.take().unwrap();
    // let mut stdin = child.stdin.take().unwrap();

    // thread::spawn(move || {
    //     let mut reader = BufReader::new(stdout);
    //     loop {
    //         let mut line = String::new();
    //         if reader.read_line(&mut line).unwrap() == 0 {
    //             break;
    //         }
    //         let e = tauri::Event{
    //           id: tauri::EventHandler(1)
    //         };
    //         // tauri::Event{}emit("shell_output", Ok(line)).unwrap();
    //     }
    // });

    // thread::spawn(move || {
    //     let mut reader = BufReader::new(stderr);
    //     loop {
    //         let mut line = String::new();
    //         if reader.read_line(&mut line).unwrap() == 0 {
    //             break;
    //         }
    //         tauri::event::emit("shell_output", Err(line)).unwrap();
    //     }
    // });

    // tauri::event::listen("shell_input", move |command| {
    //     stdin.write_all(command.as_bytes()).unwrap();
    // });

    Ok(())
}