import { FolderPlus, Login as Import, ListAdd, PageTemplate } from "@icon-park/react";
import { FormattedMessage } from "react-intl";
import './tab.css'

function Tab() {
  return (
    <div className="create-cluster-tab">
      <div className="line">
        <FolderPlus size={14}></FolderPlus>
        <span><FormattedMessage id="create a cluster"/></span>
      </div>
      <div className="line">
        <Import size={14}></Import>
        <span><FormattedMessage id="import a cluster"/></span>
      </div>
      <div className="line">
        <ListAdd size={14}></ListAdd>
        <span><FormattedMessage id="create by template"/></span>
      </div>
      <div className="line">
        <PageTemplate size={14}></PageTemplate>
        <span><FormattedMessage id="create a template"/></span>
      </div>
    </div>
  );
}

export default Tab;
