import { Button, InputBase, InputLabel } from "@mui/material";
import "./style.css"
import { msg2s, routeTo } from "../../util/util";
import React from "react";

import { Command, Child } from '@tauri-apps/api/shell';
import { Store } from "tauri-plugin-store-api";
import { useNavigate } from "react-router-dom";

export default function Test() {
  const link = useNavigate();
  const store = new Store(".settings.dat");
  const [someKey,setSomeKey] = React.useState("");
  const [cmd,setCmd] = React.useState("cmd");
  const [str,setStr] = React.useState("node -v");
  const [sth,setSth] = React.useState("");
  return (
    <div className="test">
      <div className="line">
        <Button onClick={()=>routeTo("/shell",link)}>Shell</Button>
      </div>
      <div className="line">
        <InputLabel style={{marginRight: '1rem'}}>{cmd}</InputLabel>
        <InputBase className="input" onChange={(e)=>{
          setStr(e.target.value)
        }} value={str}></InputBase>
        <Button
        className="btn"
        onClick={async ()=>{
          let command = new Command(cmd, ["/c",str]);
          command.on('close', data => {
            console.log(`command finished with code ${data.code} and signal ${data.signal}`)
          });
          command.stdout.on('data', line => {
            // console.log(`line? ${line=="\r"}`);
            if(line!='\r') { 
              console.log(`command stdout: "${line}"`);
              msg2s(line, "success");
            }
          });
          command.on("error", err => {
            console.error(err);
            // msg2s(err, "error");
          });
          command.stderr.on('data', line => {
            console.log(`command stderr: "${line}"`);
            // msg2s(line, "error");
          })
          const child = await command.spawn().catch(e => msg2s(e, "error"));
          if (child){
            console.log('pid:', child.pid);
          }
        }}>Run</Button>
      </div>
      <div className="line">
        <Button className="btn"
        onClick={async()=>{
          await store.set("some-key", 5);
          msg2s("initialize successfully!", "success");
        }}>初始Store</Button>
        <Button className="btn"
          onClick={async()=>{
          const res = await store.get("some-key");
          msg2s(`somke-key: ${JSON.stringify(res)}`, "info");
        }}>获取Store</Button>
        <InputBase placeholder="some-key value..." className="input" onChange={(e)=>{
          setSomeKey(e.target.value)
        }} value={someKey}></InputBase>
        <Button className="btn"
          onClick={async()=>{
          await store.set("some-key", { value: someKey });
          msg2s("update some-key successfully!", "success");
        }}>更新Store</Button>
      </div>
      {/* <div className="line">
        <InputBase placeholder="write some-thing..." className="input"
        value={sth} onChange={(e)=>{ setSth(e.target.value)}}></InputBase>
        <Button
        onClick={async()=>{
          const command = new Command('node', []);
          
          command.on('close', data => {
            console.log(`command finished with code ${data.code} and signal ${data.signal}`)
          });
          command.stdout.on('data', line => {
            // console.log(`line? ${line=="\r"}`);
            if(line!='\r') { 
              console.log(`command stdout: "${line}"`);
              msg2s(line, "success");
            }
          });
          command.on("error", err => {
            console.error(err);
            // msg2s(err, "error");
          });
          command.stderr.on('data', line => {
            console.log(`command stderr: "${line}"`);
            // msg2s(line, "error");
          })
          const child = await command.spawn()
            .catch(e => msg2s(e, "error"));
          if(child){
            console.log(`success: ${child.pid}`);
            await child.write(sth);
          }
        }}>写下</Button>
      </div> */}
    </div>
  )
}