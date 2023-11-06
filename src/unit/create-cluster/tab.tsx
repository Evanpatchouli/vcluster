import {
  FolderPlus,
  Login as Import,
  ListAdd,
  PageTemplate,
} from "@icon-park/react";
import { FormattedMessage } from "react-intl";
import "./tab.css";
import { Button } from "@mui/material";

function Tab() {
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
    </div>
  );
}

export default Tab;
