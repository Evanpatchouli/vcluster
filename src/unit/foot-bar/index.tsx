import { RootState } from "../../store/store";
import { Gitee } from '../icons';
import './style.css'
import {TipsOne, Github} from '@icon-park/react';
import { connect } from "react-redux";

// TodoList.js

function mapStateToProps(state:RootState) {
  const { langReducer } = state;
  return { lang: langReducer.lang };
}

function openBrowser(url:string) {
  const w = window.open('_black') as Window;
  w.location.href = url //这样就可以跳转了
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
          <Github onClick={()=>{
            openBrowser("https://github.com/Evanpatchouli/vcluster")
          }} size="20"/>
          <Gitee onClick={()=>{
            openBrowser("https://gitee.com/jun-laner/vcluster")
          }}></Gitee>
        </div>
      </div>
    )
}

export default connect(mapStateToProps)(FootBar);