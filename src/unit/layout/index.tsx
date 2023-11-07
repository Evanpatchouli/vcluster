import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ViewContainer from "./view.container";
import Tabs from "./tabs";
import TabDrawer from "./tab.drawer";
import "./style.css";

const tabs = [
  { key: "cluster-manager", value: 0 },
  { key: "create-cluster", value: 1 },
  { key: "search", value: 2 },
  { key: "database-tool", value: 3 },
  { key: "import-cluster", value: 4 },
  { key: "Terminal", value: 5 },
  { key: "theme-palette", value: 6 },
];

const switchTab = (idx: number, setTab: Function) => {
  if (idx >= 0) {
    setTab({ cur: idx });
  }
};

const switchRoute = (path: string = "", routeTo: Function) => {
  if (path) {
    routeTo(path);
  }
};

function Layout() {
  const link = useNavigate();
  const routeTo = (path: string) => link(path, { replace: true });

  let [tab, setTab] = useState({ cur: 0 });

  let [drawer, setDrawer] = useState({
    show: true,
    id: "drawer-opened",
  });

  function handleTabClick(idx: number, path?: string) {
    switchRoute(path, routeTo);
    switchTab(idx, setTab);
    const clickedExpanded = idx == tab.cur && drawer.show;
    setDrawer({
      show: !clickedExpanded,
      id: `drawer-${clickedExpanded ? "closed" : "opened"}`,
    });
  }

  return (
    <div className="layout">
      <Tabs tabs={tabs} cur={tab.cur} tabClick={handleTabClick} />
      {/** 改用id来控制展开与收缩*/}
      <TabDrawer
        cur={tab.cur}
        tabs={tabs}
        tabClick={handleTabClick}
        routeTo={routeTo}
        drawer={drawer}
      />
      <ViewContainer />
    </div>
  );
}

export default Layout;
