import { Fragment } from 'react';
import giteelogo from '../../assets/gitee_white.png';
import './icon.css'

function GiteeIcon(props:{onClick?:() => void}) {
  return(
    <Fragment>
      <img onClick={props.onClick} alt="svg-icon" src={giteelogo}></img>
    </Fragment>
  )
}

export default GiteeIcon;
