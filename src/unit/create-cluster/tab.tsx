import { FolderPlus, Login as Import, ListAdd, PageTemplate } from "@icon-park/react";
import { FormattedMessage } from "react-intl";
import "./tab.css";
import { Button } from "@mui/material";

function Tab() {
  return (
    <div className="create-cluster-tab">
      <Button className="line" variant="text" style={{ width: "100%", display: "block" }}>
        <FolderPlus size={14}></FolderPlus>
        <span>
          <FormattedMessage id="create a cluster" />
        </span>
      </Button>
      <Button className="line" variant="text" style={{ width: "100%", display: "block" }}>
        <Import size={14}></Import>
        <span>
          <FormattedMessage id="import a cluster" />
        </span>
      </Button>
      <Button className="line" variant="text" style={{ width: "100%", display: "block" }}>
        <ListAdd size={14}></ListAdd>
        <span>
          <FormattedMessage id="create by template" />
        </span>
      </Button>
      <Button className="line" variant="text" style={{ width: "100%", display: "block" }}>
        <PageTemplate size={14}></PageTemplate>
        <span>
          <FormattedMessage id="create a template" />
        </span>
      </Button>
    </div>
  );
}

export default Tab;
