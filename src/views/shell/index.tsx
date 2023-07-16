import React, { Fragment, useEffect, useState } from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';
import './style.css'
import * as path from '@tauri-apps/api/path';
import { Command } from '@tauri-apps/api/shell';
import { HotKeys } from 'react-hotkeys';

/**
 * shell communicate should through two-way event bus between backend 
 * or direcrly run shell by js-shell api with one-time cmd
 * store the curdir as state
 * @param props 
 * @returns 
 */

const Shell = (props = {}) => {
  const keyMap = {
    UP: "up",
    DOWN: "down"
  };
  
  const keyHandler = {
    // UP: ()=> {
    //   let last = inputs.pop();
    //   setAutoinput(last as string);
    // }
  }
  const initLine = [
    <TerminalOutput>Welcome to use the VCluster Terminal!</TerminalOutput>
  ];
  const [autoinput, setAutoinput] = useState("");
  const [terminalLineData, setTerminalLineData] = useState(initLine);
  const [inputs, setInuts] = useState<string[]>([]);
  const [curdir, setCurdir] = useState("$");
  useEffect(()=>{
    path.resourceDir().then(p=>{
      // setCurdir(p.replace('\\\\?\\','').slice(0, -1)+' $');
      setCurdir(p.replace('\\\\?\\','').slice(0, -1));
    });
  },[])
  const pushtermLine = (line: string) => {
    setTerminalLineData(pre=>[
      ...pre,
    <TerminalOutput>{line}</TerminalOutput>])
  }
  const cmdStrategy: {[x:string]:Function} = {
    "cd": async (context: string)=> {
      let newcur = await path.resolve(curdir, context.replace('cd ','').trim());
      console.log(`try cding to ${newcur}`);
      let command = new Command("cmd",["/c", `cd ${curdir} && ${context}`]);
      command.on('close', (data:{code:number;signal:any;}) => {
        if(!data.code) {
          setCurdir(newcur);
        }
      });
      command.on("error", err => {
        pushtermLine(err);
        console.error(err);
      });
      command.stderr.on('data', line => {
        pushtermLine(line);
        console.log(`command stderr: "${line}"`);
      })
      command.spawn().catch(e => pushtermLine(e));
    },
    "default": async(context: string)=> {
      let command = new Command("cmd",["/c", `cd ${curdir} && ${context}`]);
      // command.on('close', data => {
      //   // pushtermLine(line);
      //   console.log(`command finished with code ${data.code} and signal ${data.signal}`)
      // });
      command.stdout.on('data', line => {
        pushtermLine(line);
        console.log(`line? ${line=="\r"}`);
        if(line!='\r') { 
          console.log(`command stdout: "${line}"`);
        }
      });
      command.on("error", err => {
        pushtermLine(err);
        console.error(err);
      });
      command.stderr.on('data', line => {
        pushtermLine(line);
        console.log(`command stderr: "${line}"`);
      })
      command.spawn().catch(e => pushtermLine(e));

    }
  }
  const cmdrun = async (context: string)=> {
    let kind = "default"
    if(context.startsWith('cd')){
      kind = "cd";
    }
    await cmdStrategy[kind](context);
  }
  return (
    // <HotKeys keyMap={keyMap} handlers={keyHandler}>
      <div className="shell">
        <Terminal name={curdir}
        colorMode={ ColorMode.Dark }
        prompt={"$"}
        startingInputValue={autoinput}
        onInput={async terminalInput => {
          console.log(`New terminal input received: '${ terminalInput }'`);
          switch(terminalInput){
            case VCLUSTER_CMD.CLEAN: {
              return setTerminalLineData(initLine);
            }
            default: {
              cmdrun(terminalInput);
            }
          }
        }}>
          { terminalLineData.map((tline,idx)=>{
            return (
              <Fragment key={idx}>{tline}</Fragment>
            )
          }) }
        </Terminal>
      </div>
    // </HotKeys>
  )
};

const VCLUSTER_CMD = {
  CLEAN: 'vcluster clean'
}



export default Shell;