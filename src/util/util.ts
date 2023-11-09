import { useIntl } from "react-intl";
import { useAppDispatch } from "../store/hook";
import { showMsg, closeMsg } from "../store/msg/msg.reducer";
import { useNavigate } from "react-router";
import { NavigateFunction } from "react-router-dom";
import { AlertColor } from "@mui/material";
import { Command } from "@tauri-apps/api/shell";
import toast from "react-hot-toast";
import { useReducer } from "react";

const AlertMap = {
  success: {
    color: "#4caf50",
    icon: "✅",
  },
  info: {
    color: "#2196f3",
    icon: "ℹ️",
  },
  warning: {
    color: "#ff9800",
    icon: "⚠️",
  },
  error: {
    color: "#f44336",
    icon: "❌",
  },
};

/**
 * message will disappear after 2 seconds
 * @param content message content
 * @returns
 */
export const msg = (content: string, severity: AlertColor) => {
  // useAppDispatch(showMsg({
  //   content, severity, counter:null
  // }));
  toast(content, {
    duration: 2000,
    icon: AlertMap[severity]?.icon,
    iconTheme: {
      primary: "white",
      secondary: AlertMap[severity]?.color,
    },
  });
};

/**
 * message will disappear after 3 seconds
 * @param content message content
 * @returns
 */
export const msg3s = (content: string, severity: AlertColor) => {
  toast(content, {
    duration: 3000,
    icon: AlertMap[severity]?.icon,
    iconTheme: {
      primary: "white",
      secondary: AlertMap[severity]?.color,
    },
  });
  // let counter = setTimeout(() => {
  //   useAppDispatch(closeMsg());
  // }, 3000);
  // useAppDispatch(
  //   showMsg({
  //     content,
  //     severity,
  //     counter,
  //   })
  // );
};

/**
 * msec should be milliseconds and should be a number >= 0
 * @param content message content
 * @param msec milliseconds timeout
 * @returns
 */
export const msgms = (content: string, severity: AlertColor, msec?: number) => {
  if (msec && msec < 0) {
    return console.warn("timout cannot be negative");
  }
  toast(content, {
    duration: msec || 2000,
    icon: AlertMap[severity]?.icon,
    iconTheme: {
      primary: "white",
      secondary: AlertMap[severity]?.color,
    },
  });
};

/**
 * change route to given route path
 * @param path route path
 */
export const routeTo = (path: string, link: NavigateFunction) => {
  link(path, { replace: true });
};

/**
 * Fake sleeping...
 * @param time
 * @param result
 * @returns
 */
export function sleep<T>(time: number, result?: T) {
  return new Promise<T | undefined>(function (resolve) {
    setTimeout(() => {
      resolve(result);
    }, time);
  });
}

export const Sql = {
  /** `SELECT * FROM cluster` */
  SEL_CLUSTER_ALL: () => "SELECT * FROM cluster",
  SEL_CLUSTER_LIKE: (keyword: string) =>
    `SELECT * FROM cluster WHERE name LIKE '%${keyword}%' OR desc LIKE '%${keyword}%' OR file LIKE '%${keyword}%'`,
};

export default {
  msg,
  msg3s,
  msgms,
  routeTo,
  Sql,
};

/** `Dont't abuse it!` : a hook to force rerender right now. */
export const useForceUpdate = () => {
  const [state, _forceUpdate] = useReducer((state: number, action: { type: VCluster.Hint<"plus"> }) => {
    switch (action.type) {
      case "plus":
        return state + 1;
      default:
        return state;
    }
  }, 0);
  const forceUpdate = () => {
    _forceUpdate({ type: "plus" });
  };
  forceUpdate.count = state;
  return forceUpdate;
};
