import { FolderPlus, Help, Login as Import, ListAdd, PageTemplate } from "@icon-park/react";
import { FormattedMessage } from "react-intl";
import './style.css'
import React from "react";

function Tab() {
  const pkgs: VCluster.PkgConfig[] | null = [
    { name: "foo", desc: "", apps: [] },
  ];

  return (
    <div className="terminal-tab">
      <div className="line">
        <div>vcluster clean</div>
        <Help size={20}></Help>
      </div>
      <div className="line">
      <div>vcluster reset</div>
        <Help size={20}></Help>
      </div>
      <div className="line">
      <div>vcluster curdir</div>
        <Help size={20}></Help>
      </div>
      <div className="line">
      <div>vcluster help</div>
        <Help size={20}></Help>
      </div>
    </div>
  );
}

export default Tab;
