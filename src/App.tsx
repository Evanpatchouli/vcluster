import React, { Fragment, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

import { FormattedMessage } from 'react-intl';

import {Alert, Snackbar} from '@mui/material';
import { HashRouter, Link, Route, Router, Routes } from "react-router-dom";
import Test from "./views/test";
import LeftBar from "./unit/left-bar";
import FootBar from "./unit/foot-bar";
import MainBox from "./unit/main-box";


function App() {
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
    <div className="container">
      <LeftBar></LeftBar>
      <FootBar></FootBar>
      {/* <h1><FormattedMessage id="title"></FormattedMessage>
      </h1>

      <div className="row">
        <a href="https://reactjs.org" target="_blank" rel="noopener">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="pkg-input"
          onChange={(e) => setPkg(e.currentTarget.value)}
          placeholder="Enter a pkg path..."
        />
        <button type="submit">Launch</button>
      </form>
      <form className="row">
        <input
            onChange={(e) => setPort(Number(e.currentTarget.value))}
            placeholder="Enter a port..."
            id="greet-input"
          />
        <button type="button" className="ct-btn"
        onClick={()=>kill(port)}>Shutdown</button>
      </form>
      <p>{greetMsg}</p>
      <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}} open={msg.state}>
        <Alert severity="success"
        onClose={() => setMsg({
          state: false, content: ''
        })}>{msg.content}</Alert>
      </Snackbar>
      <div className="workstation">
        <HashRouter>
          <ul>
            <li>
              <Link to="/">首页</Link>
            </li>
            <li>
              <Link to="/test">列表</Link>
            </li>
          </ul>
          <Routes>
            <Route path="/test" Component={Test} />
          </Routes>
        </HashRouter>
      </div> */}
    </div>
  );
}

export default App;
