import { useIntl } from "react-intl";
import { useAppDispatch } from "../store/hook";
import { showMsg, closeMsg } from "../store/msg/msg.reducer";
import { useNavigate } from "react-router";
import { NavigateFunction } from "react-router-dom";
import { AlertColor } from "@mui/material";
import { Command } from "@tauri-apps/api/shell";

export const msg = (content: string, severity:AlertColor)=>{
  useAppDispatch(showMsg({
    content, severity, counter:null
  }));
}

/**
 * message will disappear after 2 seconds
 * @param content message content
 * @returns 
 */
export const msg3s = (content: string, severity:AlertColor)=>{
  let counter = setTimeout(()=>{
    useAppDispatch(closeMsg());
  }, 3000);
  useAppDispatch(showMsg({
    content, severity, counter
  }));
}

/**
 * msec should be milliseconds and should be a number >= 0
 * @param content message content
 * @param msec milliseconds timeout
 * @returns 
 */
export const msgms = (content: string, severity:AlertColor, msec?: number)=>{
  if (msec && msec < 0) {
    return console.warn("timout cannot be negative");
  }
  let counter: NodeJS.Timeout|null = null;
  if(msec) {
    counter = setTimeout(()=>{
      useAppDispatch(closeMsg());
    }, msec)
  }
  useAppDispatch(showMsg({
    content, severity, counter
  }));

}

/**
 * change route to given route path
 * @param path route path
 */
export const routeTo = (path: string, link: NavigateFunction) => {
  link(path, {replace: true});
}

// export const cmdonce = (context: string)=> {
//   let command = new Command("cmd",["/c",context]);
//   command.on('close', data => {
//     console.log(`command finished with code ${data.code} and signal ${data.signal}`)
//   });
//   command.stdout.on('data', line => {
//     // console.log(`line? ${line=="\r"}`);
//     if(line!='\r') { 
//       console.log(`command stdout: "${line}"`);
//       msg3s(line, "success");
//     }
//   });
//   command.on("error", err => {
//     console.error(err);
//     // msg3s(err, "error");
//   });
//   command.stderr.on('data', line => {
//     console.log(`command stderr: "${line}"`);
//     // msg3s(line, "error");
//   })
//   const child = await command.spawn().catch(e => msg3s(e, "error"));
//   if (child){
//     console.log('pid:', child.pid);
//   }
// }

export default {
  msg, msg3s, msgms, routeTo
}