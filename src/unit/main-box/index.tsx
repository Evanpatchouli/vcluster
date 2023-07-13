import { FormattedMessage } from 'react-intl';
import './style.css'
import {FolderPlus, FolderOpen,
  Login as Import, Help, Chinese, English
} from '@icon-park/react';

function MainBox() {
  return(
    <div className="main-box">
      <h1><FormattedMessage id='title'/></h1>
      <div className='hotkey-item'>
        <span><FolderPlus></FolderPlus></span>
        <span><FormattedMessage id='Ctrl+Alt+N'></FormattedMessage></span>
        <span>
          <span>Ctrl</span><span>+</span><span>Alt</span><span>+</span><span>N</span>
        </span>
      </div>
      <div className='hotkey-item'>
        <span><FolderOpen></FolderOpen></span>
        <span><FormattedMessage id='Ctrl+Alt+O'></FormattedMessage></span>
        <span>
          <span>Ctrl</span><span>+</span><span>Alt</span><span>+</span><span>O</span>
        </span>
      </div>
      <div className='hotkey-item'>
        <span><Import></Import></span>
        <span><FormattedMessage id='Ctrl+Alt+I'></FormattedMessage></span>
        <span>
          <span>Ctrl</span><span>+</span><span>Alt</span><span>+</span><span>I</span>
        </span>
      </div>
      <div className='hotkey-item'>
        <span><Help></Help></span>
        <span><FormattedMessage id='Ctrl+H'></FormattedMessage></span>
        <span>
          <span>Ctrl</span><span>+</span><span>H</span>
        </span>
      </div>
      <div className='hotkey-item'>
        <span><Chinese></Chinese></span>
        <span><FormattedMessage id='Ctrl+L+C'></FormattedMessage></span>
        <span>
          <span>Ctrl</span><span>+</span><span>L</span><span>+</span><span>C</span>
        </span>
      </div>
      <div className='hotkey-item'>
        <span><English></English></span>
        <span><FormattedMessage id='Ctrl+L+E'></FormattedMessage></span>
        <span>
          <span>Ctrl</span><span>+</span><span>L</span><span>+</span><span>E</span>
        </span>
      </div>
    </div>
  )
}

export default MainBox;