import { Component, ReactNode } from "react";
import { setLang } from "../../store/lang/lang.reducer";
import store, { RootState } from "../../store/store";
import { Gitee } from '../icons';
import './style.css'
import {TipsOne, Github} from '@icon-park/react';
import { useAppSelector } from "../../store/hook";
import { connect } from "react-redux";

// TodoList.js

function mapStateToProps(state:RootState) {
  const { langReducer } = state;
  return { lang: langReducer.lang };
}

function FootBar(props:{lang:string}) {
    return(
      <div className="foot-bar">
        <div id='left'>
          <div>Version: Beta-0.0.1</div>
          <div>{props.lang}</div>
        </div>
        <div id='right'>
          <TipsOne size="20"/>
          <Github size="20"/>
          <Gitee></Gitee>
        </div>
      </div>
    )
}

export default connect(mapStateToProps)(FootBar);