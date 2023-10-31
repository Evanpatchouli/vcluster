import { Login as Import } from "@icon-park/react";
import { FormattedMessage } from "react-intl";
import "./tab.css";
import { Button } from "@mui/material";

function Tab() {
  return (
    <div className="cluster-importer-tab">
      <Button variant="contained" className="cluster-importer-tab__import">
        <FormattedMessage id="Import a cluster" />
      </Button>
      <p className="cluster-importer-tab__info">
        <Import style={{ rotate: "90deg" }} size={12} />
        <span className="gap" />
        <span className="cluster-importer-tab__info__text">
          <FormattedMessage id="Import a cluster from a Json file or a Url of Json file." />
        </span>
      </p>
    </div>
  );
}

export default Tab;
