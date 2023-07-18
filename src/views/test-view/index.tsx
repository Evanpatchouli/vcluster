import { Button, InputBase, InputLabel } from "@mui/material";
import "./style.css"
import { msg2s, routeTo } from "../../util/util";
import React from "react";

import { Command, Child } from '@tauri-apps/api/shell';
import { Store } from "tauri-plugin-store-api";
import { useNavigate } from "react-router-dom";
import Api from "../../api";

export default function Test() {
  const link = useNavigate();
  const store = new Store(".settings.dat");
  const [someKey,setSomeKey] = React.useState("");
  return (
    <div className="test">
      <div className="line">
        <Button onClick={()=>routeTo("/shell",link)}>Go Shell</Button>
      </div>
      <div className="line">
        <Button className="btn"
        onClick={async()=>{
          await store.set("some-key", "5");
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
          await store.set("some-key", someKey);
          msg2s("update some-key successfully!", "success");
        }}>更新Store</Button>
      </div>
      <div className="line">
        <Button onClick={async ()=>{
          await Api.launch_app_by_id("523815094480539656");
        }}>Spawn</Button>
      </div>
    </div>
  )
}