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
import { Button, Tooltip } from "@mui/material";

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
        id: "show the help information",
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
            <Button
              className="line"
              variant="text"
              style={{
                width: "100%",
                display: "block",
                textTransform: "none",
                fontSize: 14,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "var(--color-content-leftbar)",
                }}
              >
                <span>{cmd.usage}</span>
                <Help size={14}></Help>
              </div>
            </Button>
          </Tooltip>
        </>
      ))}
    </div>
  );
}

export default Tab;
