import React from "react";
import { Routes, Route } from "react-router-dom";
import MainBox from "../main-box";
import ThemeBox from "../../views/theme-view";
import Shell from "../../views/shell";
import userView from "../../views/user-view";
import CreateView from "../../views/creat-view";
import ClusterView from "../../views/cluster-view";
import OverView from "../../views/cluster-overview-view";

// const MainBox = React.lazy(() => import("../main-box"));
// const OverView = React.lazy(() => import("../../views/cluster-overview-view"));
// const ClusterView = React.lazy(() => import("../../views/cluster-view"));
// const CreateView = React.lazy(() => import("../../views/creat-view"));
// const userView = React.lazy(() => import("../../views/user-view"));
// const Shell = React.lazy(() => import("../../views/shell"));
// const ThemeBox = React.lazy(() => import("../../views/theme-view"));

function ViewContainer() {
  return (
    <div className="view-container" id="workstation">
      <Routes>
        <Route path="/" Component={MainBox} />
        <Route path="/help" Component={MainBox} />
        <Route path="/test" Component={ThemeBox} />
        <Route path="/overview" Component={OverView} />
        <Route path="/cluster/:id" Component={ClusterView} />
        <Route path="/create" Component={CreateView} />
        <Route path="/shell" Component={Shell} />
        <Route path="/user" Component={userView} />
      </Routes>
    </div>
  );
}

export default ViewContainer;
