import { FolderPlus } from "@icon-park/react";
import { FormattedMessage } from "react-intl";
import tabComponents from "./tabs.components";

type TabDrawerProps = {
  cur: number;
  routeTo: (path: string) => void;
  tabs: {
    key: string;
    value: number;
  }[];
  tabClick: (idx: number, path?: string) => void;
  drawer: {
    show: boolean;
    id: string;
  };
};

function TabDrawer(props: TabDrawerProps) {
  const { routeTo, tabs, cur, tabClick, drawer } = props;

  const handleTitleClick = () => {
    if (cur === 0) {
      routeTo("/overview");
    }
  };

  const handleCreateCluster = () => {
    tabClick(1);
    routeTo("/create");
  };

  const showCreateClusterBtn = cur === 0;

  return (
    <div className="tab-column-container" id={drawer.id}>
      <div id="tab-title">
        <div className="text" onClick={handleTitleClick}>
          <FormattedMessage id={tabs[cur]?.key ?? "id"} />
        </div>
        <div
          hidden={!showCreateClusterBtn}
          className="btn"
          onClick={handleCreateCluster}
        >
          <FolderPlus size={20} />
        </div>
      </div>
      {tabComponents[cur]}
    </div>
  );
}

export default TabDrawer;
