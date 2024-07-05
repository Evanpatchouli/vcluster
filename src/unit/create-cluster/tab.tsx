import {
  FolderPlus,
  Login as Import,
  ListAdd,
  PageTemplate,
} from "@icon-park/react";
import { FormattedMessage } from "react-intl";
import "./tab.css";
import { Button } from "@mui/material";
import { useState } from "react";
import Importer from "../import-dialog";

interface CreateClusterTabProps {
  tabClick?: (idx: number, path?: string) => void;
}

function Tab(props: CreateClusterTabProps) {
  const [importer, setImporter] = useState(false);
  const handleImportClick = () => {
    // 目前无效，不知道为何传不进来
    props.tabClick?.(4);
    setImporter(true);
  };
  return (
    <div className="create-cluster-tab">
      <Button
        className="line"
        variant="text"
        style={{ width: "100%", display: "block" }}
      >
        <FolderPlus
          className="create-cluster-tab-item__icon"
          size={14}
        ></FolderPlus>
        <span className="create-cluster-tab-item__text">
          <FormattedMessage id="create a cluster" />
        </span>
      </Button>
      <Button
        className="line"
        variant="text"
        style={{ width: "100%", display: "block" }}
        onClick={handleImportClick}
      >
        <Import className="create-cluster-tab-item__icon" size={14}></Import>
        <span className="create-cluster-tab-item__text">
          <FormattedMessage id="import a cluster" />
        </span>
      </Button>
      <Button
        className="line"
        variant="text"
        style={{ width: "100%", display: "block" }}
      >
        <ListAdd className="create-cluster-tab-item__icon" size={14}></ListAdd>
        <span className="create-cluster-tab-item__text">
          <FormattedMessage id="create by template" />
        </span>
      </Button>
      <Button
        className="line"
        variant="text"
        style={{ width: "100%", display: "block" }}
      >
        <PageTemplate
          className="create-cluster-tab-item__icon"
          size={14}
        ></PageTemplate>
        <span className="create-cluster-tab-item__text">
          <FormattedMessage id="create a template" />
        </span>
      </Button>
      <Importer open={importer} setOpen={setImporter} />
    </div>
  );
}

export default Tab;
