import { useAppSelector, useAppDispatch } from "./store/hook";
import { RootState, langReducer } from "./store/store";
import { setLang } from "./store/lang/lang.reducer";
import { IntlProvider } from "react-intl";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { connect } from "react-redux";

function mapStateToProps(state: RootState) {
  const { langReducer } = state;
  return { lang: langReducer.lang, messages: langReducer.messages };
}

function MainApp(props: { lang: string; messages: {} }) {
  useAppDispatch(setLang(props.lang));
  return (
    <IntlProvider
      messages={props.messages}
      locale={props.lang}
      defaultLocale="en"
    >
      <HashRouter>
        <App />
      </HashRouter>
    </IntlProvider>
  );
}

export default connect(mapStateToProps)(MainApp);
