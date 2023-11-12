import { useAppDispatch } from "./store/hook";
import { RootState, langReducer } from "./store/store";
import { setLang } from "./store/lang/lang.reducer";
import { IntlProvider } from "react-intl";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { connect } from "react-redux";
import { Snackbar, Alert, AlertColor } from "@mui/material";
import MsgState from "./store/msg/msg.state";
import { closeMsg } from "./store/msg/msg.reducer";
import { useEffect } from "react";
import { setTheme } from "./store/theme/theme.reducer";
import { setPermission } from "./store/permission/permission.reducer";
import {
  isPermissionGranted,
  requestPermission,
} from "@tauri-apps/api/notification";
import { TautiStoreState } from "./store/tauri/type";

function mapStateToProps(state: RootState) {
  const { langReducer, msgReducer } = state;
  return {
    lang: langReducer.lang,
    messages: langReducer.messages,
    msg: msgReducer,
  };
}

const initStore = () => {
  TauriStore?.values().then(async (v: TautiStoreState) => {
    useAppDispatch(setTheme(v?.theme ?? "dark"));
    TauriStore.theme = v?.theme ?? "dark";

    useAppDispatch(setLang(v?.lang ?? "en"));
    TauriStore.lang = v?.lang ?? "en";

    let permissionGranted = await isPermissionGranted();
    if (!permissionGranted) {
      const permission = await requestPermission();
      permissionGranted = permission === "granted";
    }
    let permissions = v?.permission ?? ["read", "write", "execute"];
    if (permissionGranted) {
      permissions.push("notify");
      permissions = Array.from(new Set(permissions));
    } else {
      permissions = permissions.filter((item) => item !== "notify");
    }
    useAppDispatch(setPermission(permissions));
    TauriStore.permission = permissions;

    TauriStore.settings = v?.settings ?? {
      notification: true,
    };
  });
};

function MainApp(props: { lang: string; messages: {}; msg: MsgState }) {
  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
  };
  document.addEventListener("contextmenu", handleContextMenu);

  useAppDispatch(setLang(props.lang));

  useEffect(() => {
    initStore();
  }, []);

  return (
    <IntlProvider
      messages={props.messages}
      locale={props.lang}
      defaultLocale="en"
    >
      <HashRouter>
        <App />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={props.msg.state}
        >
          <Alert
            severity={props.msg.severity}
            onClose={() => {
              console.log("close msg");
              useAppDispatch(closeMsg());
              console.log(props.msg);
            }}
          >
            {props.msg.content}
          </Alert>
        </Snackbar>
      </HashRouter>
    </IntlProvider>
  );
}

export default connect(mapStateToProps)(MainApp);
