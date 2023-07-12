import React, { useState } from 'react';
import './style.css'
import {SeoFolder, FolderPlus, Search, DatabaseEnter,
  Login as Import, Help, Logout as Export,
  User, Setting
} from '@icon-park/react';
import { FormattedMessage } from 'react-intl';
import Popover from '@mui/material/Popover';
import MainBox from '../main-box';
import { Route, useNavigate, Routes } from "react-router-dom";
import Test from '../../views/test';
import SetBox from '../set-box';

function LeftBar() {
  const link = useNavigate();
  const routeTo = (path: string) => {
    link(path, {replace: true});
  }
  const tabs = [
    { key: 'cluster-manager' },
    { key: 'create-cluster' },
    { key: 'search' },
    { key: 'database-tool' },
    { key: 'import-cluster' },
    { key: 'export-cluster' },
  ]
  let [tab, setTab] = useState({ cur: 0});
  let [drawer, setDrawer] = useState({
    show: true,
  });
  function handleTabClick(idx: number, path?: string) {
    if (path) {
      routeTo(path);
    }
    setTab({cur: idx});
    if(idx == tab.cur && drawer.show) { 
      setDrawer({show: false});
    } else {
      setDrawer({show: true});
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

  const [langbox, setLangbox] = useState(false);
  const [langAnchor, setLangAnchor] = useState<Element|null>(null);
  const handleLangboxClick = (event: React.MouseEvent) => {
    setLangAnchor(event.currentTarget);
    setLangbox(true)
  };
  function handleLangboxClose() {
    setLangbox(false)
  }

  return (
    <div className='left-bar'>
      <div className="column-container" id="left-bar">
        <div id="top">
          <SeoFolder
            onClick={() => handleTabClick(0, "/main")}
            size="30"
            tabIndex={0}
          ></SeoFolder>
          <FolderPlus
            onClick={() => handleTabClick(1, "/test")}
            size="30"
            tabIndex={1}
          ></FolderPlus>
          <Search
            onClick={() => handleTabClick(2)}
            size="30"
            tabIndex={2}
          ></Search>
          <DatabaseEnter
            onClick={() => handleTabClick(3)}
            size="30"
            tabIndex={3}
          ></DatabaseEnter>
          <Import onClick={() => handleTabClick(4)} size="30" tabIndex={4} />
          <Export onClick={() => handleTabClick(5)} size="30" tabIndex={5} />
        </div>
        <div id="foot">
          <Help size="30" tabIndex={-1} />
          <User size="30" tabIndex={-2} />
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
      {drawer.show ? (
        <div className="column-container" id="drawer">
          <div id="tab-title">
            <span>
              <FormattedMessage id={tabs[tab.cur].key}></FormattedMessage>
            </span>
          </div>
          <div className='cluster'>∨ online-mall-plus</div>
          <div className='apps'>cloud-gateway</div>
          <div className='apps'>centre-service</div>
          <div className='apps'>order-service</div>
          <div className='apps'>message-service</div>
          <div className='apps'>star-service</div>
        </div>
      ) : null}
      <div className='column-container' id='workstation'>
        <Routes>
          <Route path="/" Component={MainBox} />
          <Route path="/main" Component={MainBox} />
          <Route path="/test" Component={Test} />
        </Routes>
      </div>
    </div>
  );
}

export default LeftBar;