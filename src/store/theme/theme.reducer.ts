import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { THEME_ACTIONS_TYPES } from "./theme.actions";

export const counterSlice = createSlice({
  name: "theme",
  initialState: {
    theme: "dark" as "dark" | "light" | "system",
    vars: {
      globalTextColor: {
        cssVar: "--global-text-color",
        dark: "#ebebeb",
        light: "#0f0f0f",
        custom: null,
      },
      viewTextColor: {
        cssVar: "--color-view__text",
        dark: "#ebebeb",
        light: "#0f0f0f",
        custom: null,
      },
      viewElementColor: {
        cssVar: "--color-view__element",
        dark: "#0f0f0f",
        light: "#0f0f0f",
        custom: null,
      },
      viewElementBackgroundColor: {
        cssVar: "--bg-color-view__element",
        dark: "#ffffff",
        light: "#f3f3f3",
        custom: null,
      },
      viewElementActiveBackgroundColor: {
        cssVar: "--bg-color-view__element-active",
        dark: "#e8e8e8",
        light: "#ebebeb",
        custom: null,
      },
      elementActiveOrFocusColor: {
        cssVar: "--color-element__active-or-focus-highlight",
        dark: "dodgerblue",
        light: "dodgerblue",
        custom: null,
      },

      BaseContentColor: {
        cssVar: "--color-content-base",
        dark: "#888888",
        light: "#888888",
        custom: null,
      },
      leftBarContentColor: {
        cssVar: "--color-content-leftbar",
        dark: "#888888",
        light: "#888888",
        custom: null,
      },
      leftBarBackgroundColor: {
        cssVar: "--bg-color-leftbar",
        dark: "rgb(24, 24, 24)",
        light: "rgb(245, 245, 245)",
        custom: null,
      },
      leftBarTabColumnBackgroundColor: {
        cssVar: "--bg-color-leftbar-tab-column",
        dark: "rgb(27, 27, 27)",
        light: "rgb(225, 225, 225)",
        custom: null,
      },
      footerBackgroundColor: {
        cssVar: "--bg-color-footer",
        dark: "rgb(27, 27, 27)",
        light: "rgb(225, 225, 225)",
        custom: null,
      },
      viewContainerBackgroundColor: {
        cssVar: "--bg-color-view-container",
        dark: "rgb(34, 34, 34)",
        light: "rgb(250, 250, 250)",
        custom: null,
      },
      layoutElementBorderColor: {
        cssVar: "--border-color-layout-element",
        dark: "rgb(40, 40, 40)",
        light: "rgb(215, 215, 215)",
        custom: null,
      },
      interactiveElementHoverBackgroundColor: {
        cssVar: "--bg-color-interactive-element-hover",
        dark: "#313131",
        light: "#7a7a7a",
        custom: null,
      },
      interactiveElementHoverBackgroundColorLighter: {
        cssVar: "--bg-color-interactive-element-hover-lighter",
        dark: "#4a4a4a",
        light: "#bbbbbb",
        custom: null,
      },
      textButtonHoverColor: {
        cssVar: "--color-textButtn-hover",
        dark: "#313131",
        light: "#e5e5e5",
        custom: null,
      },
      scrollBarThumbBackgroundColor: {
        cssVar: "--bg-color-scrollbar-thumb",
        dark: "var(--bg-color-usefule-element-hover)",
        light: "var(--bg-color-usefule-element-hover)",
        custom: null,
      },
      scrollBarThumbBackHovergroundColor: {
        cssVar: "--bg-color-scrollbar-thumb-hover",
        dark: "#888888",
        light: "#888888",
        custom: null,
      },
      currentTabBorderColor: {
        cssVar: "--border-color-tab-current",
        dark: "rgb(128, 128, 255)",
        light: "rgb(128, 128, 255)",
        custom: null,
      },

      elementBoxShadow: {
        cssVar: "--element-boxshadow",
        dark: "0 2px 2px rgba(0, 0, 0, 0.2)",
        light: "0 2px 2px rgba(0, 0, 0, 0.2)",
        custom: null,
      },

      elementInactiveOrUnfocusColor: {
        cssVar: "--color-element__inactive-or-unfocus",
        dark: "#888888",
        light: "#888888",
        custom: null,
      },

      appmenuItemBackgroundColor: {
        cssVar: "--bg-color-appmenu-item",
        dark: "rgb(32, 32, 32)",
        light: "rgb(32, 32, 32)",
        custom: null,
      },

      shellBackgroundColor: {
        cssVar: "--bg-color-shell",
        dark: "black",
        light: "black",
        custom: null,
      },
      shellCaretColor: {
        cssVar: "--bg-color-shell-caret",
        dark: "white",
        light: "white",
        custom: null,
      },
    },
  },
  reducers: {
    setTheme: (state, action: PayloadAction<"dark" | "system" | "light">) => {
      const { type, payload } = action;
      if (state.theme === payload) {
        return state;
      }
      let _state = {
        ...state,
        theme: payload,
      };
      switch (payload) {
        case "dark":
          Object.keys(state.vars).forEach(
            (key: keyof typeof state.vars | (string & {})) => {
              document.documentElement.style.setProperty(
                // @ts-ignore
                _state.vars[key].cssVar,
                // @ts-ignore
                _state.vars[key].dark
              );
            }
          );
          break;
        case "light":
          Object.keys(state.vars).forEach(
            (key: keyof typeof state.vars | (string & {})) => {
              document.documentElement.style.setProperty(
                // @ts-ignore
                _state.vars[key].cssVar,
                // @ts-ignore
                _state.vars[key].light
              );
            }
          );
          break;
        case "system":
          Object.keys(state.vars).forEach(
            (key: keyof typeof state.vars | (string & {})) => {
              let systemMode = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light";
              document.documentElement.style.setProperty(
                // @ts-ignore
                _state.vars[key].cssVar,
                // @ts-ignore
                _state.vars[key][systemMode]
              );
            }
          );
          break;
        default:
          break;
      }
      return _state;
    },
    customize: (
      state,
      action: PayloadAction<
        {
          key: keyof typeof state.vars | (string & {});
          value: string | undefined | null;
        }[]
      >
    ) => {
      const { type, payload } = action;
      let _state = { ...state };
      Object.keys(payload).forEach(
        (key: keyof typeof _state.vars | (string & {})) => {
          // @ts-ignore
          _state.vars[payload[key].key].custom = payload[key].value;
          document.documentElement.style.setProperty(
            // @ts-ignore
            _state.vars[key].cssVar,
            // @ts-ignore
            _state.vars[key].custom
          );
        }
      );
      return _state;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { setTheme } = counterSlice.actions;
export const { customize } = counterSlice.actions;

export default counterSlice.reducer;
