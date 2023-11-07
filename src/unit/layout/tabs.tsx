import {
  SeoFolder,
  FolderPlus,
  DatabaseEnter,
  Login as Import,
  Platte,
  Help,
  User,
  Setting,
  Search,
  Terminal,
} from "@icon-park/react";
import { Popover } from "@mui/material";
import SetBox from "../set-box";
import { useState } from "react";

type TabsProps = {
  tabs: {
    key: string;
    value: number;
  }[];
  cur: number;
  tabClick: (idx: number, path?: string) => void;
};

const Tabs = (props: TabsProps) => {
  function matchTabClass(idx: number) {
    if (props.cur === idx) {
      return "tab-selected";
    }
    return "tab-unselected";
  }

  const [setting, setSetting] = useState(false);
  const [settingAnchor, setSettingAnchor] = useState<Element | null>(null);
  const handleSettingClick = (event: React.MouseEvent) => {
    setSettingAnchor(event.currentTarget);
    setSetting(true);
  };
  function handleSettingClose() {
    setSetting(false);
  }

  return (
    <div className="tab-column-container" id="left-bar">
      <div id="top">
        <SeoFolder
          className={matchTabClass(0)}
          onClick={() => props.tabClick(0)}
          size="30"
          tabIndex={0}
        />
        <FolderPlus
          className={matchTabClass(1)}
          onClick={() => props.tabClick(1, "/create")}
          size="30"
          tabIndex={1}
        />
        <Search
          className={matchTabClass(2)}
          onClick={() => props.tabClick(2)}
          size="30"
          tabIndex={2}
        />
        <DatabaseEnter
          className={matchTabClass(3)}
          onClick={() => props.tabClick(3)}
          size="30"
          tabIndex={3}
        />
        <Import
          className={matchTabClass(4)}
          onClick={() => props.tabClick(4)}
          size="30"
          tabIndex={4}
        />
        <Terminal
          className={matchTabClass(5)}
          onClick={() => props.tabClick(5, "/shell")}
          size="30"
          tabIndex={5}
        />
        <Platte
          className={matchTabClass(6)}
          onClick={() => props.tabClick(6, "test")}
          size="30"
          tabIndex={6}
        />
      </div>
      <div id="foot">
        <Help
          size="30"
          tabIndex={-1}
          onClick={() => props.tabClick(-1, "/help")}
        />
        <User
          size="30"
          onClick={() => props.tabClick(-3, "/user")}
          tabIndex={-2}
        />
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
  );
};

export default Tabs;
