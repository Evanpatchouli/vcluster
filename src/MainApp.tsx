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

function mapStateToProps(state: RootState) {
  const { langReducer, msgReducer } = state;
  return { lang: langReducer.lang, messages: langReducer.messages, msg: msgReducer };
}

function MainApp(props: { lang: string; messages: {}; msg: MsgState }) {

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
  }
  document.addEventListener('contextmenu', handleContextMenu);

  const niubi = "error";

  useAppDispatch(setLang(props.lang));
  return (
    <IntlProvider
      messages={props.messages}
      locale={props.lang}
      defaultLocale="en"
    >
      <HashRouter>
        <App />
        <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}} open={props.msg.state}>
          <Alert severity={props.msg.severity}
          onClose={() => {
            console.log("close msg");
            useAppDispatch(closeMsg());
            console.log(props.msg)
          }}>{props.msg.content}</Alert>
        </Snackbar>
      </HashRouter>
    </IntlProvider>
  );
}

export default connect(mapStateToProps)(MainApp);
