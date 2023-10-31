import {
  FolderPlus,
  Help,
  Login as Import,
  ListAdd,
  PageTemplate,
} from "@icon-park/react";
import { FormattedMessage, useIntl } from "react-intl";
import "./style.css";
import React from "react";
import { tauri } from "@tauri-apps/api";
import { Tooltip } from "@mui/material";

function Tab() {
  const intl = useIntl();
  const commands = [
    {
      usage: "vcluster clean",
      desc: intl.formatMessage({
        id: "clean up the terminal",
      }),
    },
    {
      usage: "vcluster reset",
      desc: intl.formatMessage({
        id: "reset the vcluster",
      }),
    },
    {
      usage: "vcluster curdir",
      desc: intl.formatMessage({
        id: "show the current directory",
      }),
    },
    {
      usage: "vcluster help",
      desc: intl.formatMessage({
        id: "show the help info",
      }),
    },
  ];
  return (
    <div className="terminal-tab">
      {commands.map((cmd) => (
        <>
          <Tooltip
            title={intl.formatMessage({
              id: cmd.desc,
            })}
            placement="top-end"
          >
            <div className="line">
              <div>{cmd.usage}</div>
              <Help size={20}></Help>
            </div>
          </Tooltip>
        </>
      ))}
    </div>
  );
}

export default Tab;
