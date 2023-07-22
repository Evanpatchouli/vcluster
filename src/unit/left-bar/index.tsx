import React, { useState, lazy } from 'react';
import './style.css'
import {SeoFolder, FolderPlus, Search, DatabaseEnter,
  Login as Import, Help, 
  User, Setting, Platte, Terminal
} from '@icon-park/react';
import { FormattedMessage } from 'react-intl';
import Popover from '@mui/material/Popover';
import MainBox from '../main-box';
import { Route, useNavigate, Routes } from "react-router-dom";
import TestBox from '../../views/test-view';
import ClusterOverView from '../../views/cluster-overview-view';
import CreateView from '../../views/creat-view';
import SetBox from '../set-box';
import ClusterManagerTab from '../cluster-manager/tab';
import CreateClusterTab from '../create-cluster/tab';
import TerminalTab from '../terminal-tab';
import Shell from '../../views/shell';
import ClusterView from '../../views/cluster-view';
import userView from '../../views/user-view';

function LeftBar() {
  const link = useNavigate();
  const routeTo = (path: string) => link(path, {replace: true});
  const tabs = [
    { key: 'cluster-manager' },
    { key: 'create-cluster' },
    { key: 'search' },
    { key: 'database-tool' },
    { key: 'import-cluster' },
    { key: 'Terminal' },
    { key: 'Test-playground' },
  ]
  let [tab, setTab] = useState({ cur: 0});
  let [drawer, setDrawer] = useState({
    show: true,
    id: 'drawer-opened'
  });
  function matchTabClass(idx: number) {
    if(tab.cur === idx) {
      return "tab-selected";
    }
    return "tab-unselected";
  }
  function handleTabClick(idx: number, path?: string) {
    if (path) {
      routeTo(path);
    }
    const switchtabs = [0,1,2,3,4,5,6];
    if (switchtabs.includes(idx)) {
      setTab({cur: idx});
      if(idx == tab.cur && drawer.show) { 
        setDrawer({show: false, id: 'drawer-closed'});
      } else {
        setDrawer({show: true, id: 'drawer-opened'});
      }
    }
  }
  const [setting, setSetting] = useState(false);
  const [settingAnchor, setSettingAnchor] = useState<Element|null>(null);
  const handleSettingClick = (event: React.MouseEvent) => {
    setSettingAnchor(event.currentTarget);
    setSetting(true)
  };
  function handleSettingClose() {
    setSetting(false)
  }

  return (
    <div className='left-bar'>
      <div className="column-container" id="left-bar">
        <div id="top">
          <SeoFolder className={matchTabClass(0)}
            onClick={() => handleTabClick(0)}
            size="30"
            tabIndex={0}
          ></SeoFolder>
          <FolderPlus className={matchTabClass(1)}
            onClick={() => handleTabClick(1, "/create")}
            size="30"
            tabIndex={1}
          ></FolderPlus>
          <Search className={matchTabClass(2)}
            onClick={() => handleTabClick(2)}
            size="30"
            tabIndex={2}
          ></Search>
          <DatabaseEnter className={matchTabClass(3)}
            onClick={() => handleTabClick(3)}
            size="30"
            tabIndex={3}
          ></DatabaseEnter>
          <Import className={matchTabClass(4)}
            onClick={() => handleTabClick(4)} size="30" tabIndex={4} />
          <Terminal  className={matchTabClass(5)}
            onClick={() => handleTabClick(5, "/shell")} size="30" tabIndex={5} />
          <Platte  className={matchTabClass(6)}
            onClick={() => handleTabClick(6, "test")} size="30" tabIndex={6} />
        </div>
        <div id="foot">
          <Help size="30" tabIndex={-1}
          onClick={()=>handleTabClick(-1, "/help")}/>
          <User size="30"
          onClick={()=>handleTabClick(-3, "/user")} tabIndex={-2} />
          <Setting size="30" tabIndex={-3} onClick={handleSettingClick} />
        </div>
        <Popover
          open={setting}
          onClose={handleSettingClose}
          anchorEl={settingAnchor}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <SetBox></SetBox>
        </Popover>
      </div>
      {/** 改用id来控制展开与收缩*/}
      {drawer.show||!drawer.show ? (
        <div className="column-container" id={drawer.id}>
          <div id="tab-title">
            <div className='text' onClick={()=>{
              if(tab.cur==0){
                routeTo("/overview");
              }
            }}>
              <FormattedMessage id={tabs[tab.cur].key}></FormattedMessage>
            </div>
            {tab.cur==0?(<div className='btn'
            onClick={()=>{
              handleTabClick(1);
              routeTo("/create");
            }}><FolderPlus size={20}/></div>):null}
          </div>
          {tab.cur==0?
          (<ClusterManagerTab></ClusterManagerTab>):null
          }
          {tab.cur==1?
          (<CreateClusterTab></CreateClusterTab>):null
          }
          {tab.cur==5?
          (<TerminalTab></TerminalTab>):null
          }
        </div>
      ) : null}
      <div className='column-container' id='workstation'>
        <Routes>
          <Route path="/" Component={MainBox} />
          <Route path="/help" Component={MainBox} />
          <Route path="/test" Component={TestBox} />
          <Route path="/overview" Component={ClusterOverView} />
          <Route path="/cluster/:id" Component={ClusterView} />
          <Route path="/create" Component={CreateView} />
          <Route path="/shell" Component={Shell} />
          <Route path="/user" Component={userView} />
        </Routes>
      </div>
    </div>
  );
}

export default LeftBar;