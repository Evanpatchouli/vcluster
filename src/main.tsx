import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

import store, { RootState } from './store/store';
import { Provider, connect } from 'react-redux';

import '@icon-park/react/styles/index.css';
import MainApp from "./MainApp";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <MainApp></MainApp>
    </Provider>
  </React.StrictMode>
);
