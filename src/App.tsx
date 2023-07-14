import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

import LeftBar from "./unit/left-bar";
import FootBar from "./unit/foot-bar";

import { HotKeys } from "react-hotkeys";
import { useAppDispatch } from "./store/hook";
import { setLang } from "./store/lang/lang.reducer";
import { useNavigate } from "react-router-dom";
import { routeTo } from "./util/util";

const keyMap = {
  CREATE_CLUSTER: "ctrl+alt+n",
  GET_HELP: "ctrl+h",
  SWITCH_LANG_CN: ["ctrl+l+c"],
  SWITCH_LANG_EN: ["ctrl+l+e"],
};

function App() {
  const link = useNavigate();

  const keyHandler = {
    CREATE_CLUSTER: ()=> {
      routeTo("/create", link);
    },
    GET_HELP: ()=> {
      routeTo("/", link);
    },
    SWITCH_LANG_CN: ()=> {
      useAppDispatch(setLang("cn"));
    },
    SWITCH_LANG_EN: ()=> {
      useAppDispatch(setLang("en"));
    }
  }


  const [greetMsg, setGreetMsg] = useState("");
  const [pkg, setPkg] = useState("");
  const [port, setPort] = useState(0);
  const [msg, setMsg] = useState({
    state: false,
    content: ''
  });

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
    await invoke("launch", { pkgConfigPath: pkg });
  }

  function kill(port: number) {
    if (port === 0) {
      setMsg({
        state: true,
        content: 'Please input a valid port number!'
      });
      return;
    }
    invoke("kill", { port });
  }

  return (
    <HotKeys keyMap={keyMap} handlers={keyHandler}>
    <div className="container">
      <LeftBar></LeftBar>
      <FootBar></FootBar>
    </div>
    </HotKeys>
  );
}

export default App;
