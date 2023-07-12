import { FormattedMessage } from 'react-intl';
import './style.css'
import {FolderPlus, FolderOpen,
  Login as Import, Help
} from '@icon-park/react';

function MainBox() {
  return(
    <div className="main-box">
      <h1><FormattedMessage id='title'/></h1>
      <div>
        <span><FolderPlus></FolderPlus></span>
        <span><FormattedMessage id='Ctrl+Alt+N'></FormattedMessage></span>
        <span>Ctrl + Alt + N</span>
      </div>
      <div>
        <span><FolderOpen></FolderOpen></span>
        <span><FormattedMessage id='Ctrl+Alt+O'></FormattedMessage></span>
        <span>Ctrl + Alt + O</span>
      </div>
      <div>
        <span><Import></Import></span>
        <span><FormattedMessage id='Ctrl+Alt+I'></FormattedMessage></span>
        <span>Ctrl + Alt + I</span>
      </div>
      <div>
        <span><Help></Help></span>
        <span><FormattedMessage id='Ctrl+H'></FormattedMessage></span>
        <span>Ctrl + H</span>
      </div>
    </div>
  )
}

export default MainBox;