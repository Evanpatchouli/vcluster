import { Popover } from "@mui/material";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import "./style.css";
import { useAppSelector, useAppDispatch } from '../../store/hook';
import {setLang} from "../../store/lang/lang.reducer";
import store from "../../store/store";

class SetBox extends React.Component {

  constructor(props:{}) {
    super(props);
  }

  state: {
    langbox: boolean,
    langAnchor: Element|null
  } = {
    langbox: false,
    langAnchor: null
  }

  setLangbox(bool: boolean) {
    this.setState({
      langbox: bool
    })
  }

  setLangAnchor(elem: Element|null) {
    this.setState({
      langAnchor: elem
    })
  }

  render(): React.ReactNode {
    const handleLangboxClick = (event: React.MouseEvent) => {
      this.setLangAnchor(event.currentTarget);
      this.setLangbox(true)
    };
    const handleLangboxClose = () => {
      this.setLangbox(false)
    }
    return (
      <div>
        <div className="setbox">
          <div className="setbox-item" onClick={handleLangboxClick}>
            <FormattedMessage id="language"></FormattedMessage>
            <span style={{paddingLeft: '0.5rem'}}>({store.getState().langReducer.lang})</span>
          </div>
          <div>
            <FormattedMessage id="setting"></FormattedMessage>
          </div>
          <div>
            <FormattedMessage id="checkUpdate"></FormattedMessage>
          </div>
        </div>
        <Popover
          open={this.state.langbox}
          onClose={handleLangboxClose}
          anchorEl={this.state.langAnchor}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <div className="lang-list">
            <div
              onClick={() => {
                useAppDispatch(setLang("cn"));
                handleLangboxClose();
              }}
            >
              简体中文
            </div>
            <div
              onClick={() => {
                useAppDispatch(setLang("en"));
                handleLangboxClose();
              }}
            >
              en_US
            </div>
          </div>
        </Popover>
      </div>
    );
  }
}

export default SetBox;
