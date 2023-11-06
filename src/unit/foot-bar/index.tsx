import { RootState } from "../../store/store";
import { Gitee } from "../icons";
import "./style.css";
import { TipsOne, Github } from "@icon-park/react";
import { connect } from "react-redux";

import { open } from "@tauri-apps/api/shell";
import { useIntl } from "react-intl";

// TodoList.js

function mapStateToProps(state: RootState) {
  const { langReducer } = state;
  return { lang: langReducer.lang };
}

async function openBrowser(url: string) {
  // const w = window.open('_black') as Window;
  // w.location.href = url // This way is to open a new webview window
  await open(url);
}

function FootBar(props: { lang: string }) {
  const intl = useIntl();
  return (
    <div className="foot-bar">
      <div id="left">
        <div>
          {intl.formatMessage({
            id: "Version",
          })}{" "}
          : Beta-0.0.1
        </div>
        <div>
          {intl.formatMessage({
            id: props.lang,
          })}
        </div>
      </div>
      <div id="right">
        <TipsOne size="20" />
        <Github
          onClick={() => {
            openBrowser("https://github.com/Evanpatchouli/vcluster");
          }}
          size="20"
        />
        <Gitee
          onClick={() => {
            openBrowser("https://gitee.com/jun-laner/vcluster");
          }}
        ></Gitee>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(FootBar);
