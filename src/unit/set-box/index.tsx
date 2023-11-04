import { Popover } from "@mui/material";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import "./style.css";
import { useAppSelector, useAppDispatch } from "../../store/hook";
import { setLang } from "../../store/lang/lang.reducer";
import store from "../../store/store";
import { setTheme } from "../../store/theme/theme.reducer";

type PopoverType = "lang" | "theme" | (string & {});

class SetBox extends React.Component {
  constructor(props: {}) {
    super(props);
  }

  state: {
    popover: boolean;
    langAnchor: Element | null;
    popoverType: PopoverType;
  } = {
    popover: false,
    langAnchor: null,
    popoverType: "lang",
  };

  setPopover(bool: boolean) {
    this.setState({
      popover: bool,
    });
  }

  setLangAnchor(elem: Element | null) {
    this.setState({
      langAnchor: elem,
    });
  }

  setPopoverType(type: PopoverType) {
    this.setState({
      popoverType: type,
    });
  }

  render(): React.ReactNode {
    const handleLangboxClick = (event: React.MouseEvent) => {
      this.setLangAnchor(event.currentTarget);
      this.setPopoverType("lang");
      this.setPopover(true);
    };
    const handleLangboxClose = () => {
      this.setPopover(false);
    };
    const handleThemeClick = (event: React.MouseEvent) => {
      this.setLangAnchor(event.currentTarget);
      this.setPopoverType("theme");
      this.setPopover(true);
    };
    const popoverContent = () => {
      switch (this.state.popoverType) {
        case "lang":
          return (
            <>
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
            </>
          );
        case "theme": {
          return (
            <>
              <div
                onClick={() => {
                  useAppDispatch(setTheme("system"));
                  handleLangboxClose();
                }}
              >
                <FormattedMessage id="system" />
              </div>
              <div
                onClick={() => {
                  useAppDispatch(setTheme("dark"));
                  handleLangboxClose();
                }}
              >
                <FormattedMessage id="dark" />
              </div>
              <div
                onClick={() => {
                  useAppDispatch(setTheme("light"));
                  handleLangboxClose();
                }}
              >
                <FormattedMessage id="light" />
              </div>
            </>
          );
        }
        default:
          return "";
      }
    };
    // const theme = useAppSelector(state => state.themeReducer.theme);
    return (
      <div>
        <div className="setbox">
          <div className="setbox-item" onClick={handleLangboxClick}>
            <FormattedMessage id="language"></FormattedMessage>
            <span style={{ paddingLeft: "0.5rem" }}>
              ({store.getState().langReducer.lang})
            </span>
          </div>
          <div className="row" onClick={handleThemeClick}>
            <FormattedMessage id="theme"></FormattedMessage>
            <span style={{ paddingLeft: "0.5rem" }}>
              (<FormattedMessage id={store.getState().themeReducer.theme} />)
            </span>
          </div>
          <div>
            <FormattedMessage id="setting"></FormattedMessage>
          </div>
          <div>
            <FormattedMessage id="checkUpdate"></FormattedMessage>
          </div>
        </div>
        <Popover
          open={this.state.popover}
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
          <div className="setting-popover-list">{popoverContent()}</div>
        </Popover>
      </div>
    );
  }
}

export default SetBox;
