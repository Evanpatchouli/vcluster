import {
  FolderPlus,
  Login as Import,
  ListAdd,
  PageTemplate,
} from "@icon-park/react";
import { FormattedMessage, useIntl } from "react-intl";
import "./tab.css";

function Tab() {
  const intl = useIntl();
  return (
    <div className="theme-palette-tab">
      <p className="theme-info">
        {intl.formatMessage({
          id: "$THEME_INFO",
        })}
      </p>
    </div>
  );
}

export default Tab;
