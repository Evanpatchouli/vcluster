import { sendNotification } from "@tauri-apps/api/notification";
import { NavigateFunction } from "react-router-dom";
import { AlertColor } from "@mui/material";
import { Command } from "@tauri-apps/api/shell";
import toast from "react-hot-toast";
import { useReducer, useState } from "react";
import { z } from "zod";
import { confirm, message } from "@tauri-apps/api/dialog";
import { useAppSelector } from "../store/hook";

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

export const notify = async (
  content: string,
  title?: string,
  icon?: string
) => {
  console.debug("await TauriStore.values()", await TauriStore.values());
  const provider = (await TauriStore.values()).permission;
  if (hasPermi(["notify"], provider).result) {
    sendNotification({
      title: title ?? "VCluster",
      body: content,
      icon: icon ?? "vcluster.png",
    });
  }
  //await message('Tauri is awesome', { title: 'VCluster', type: 'warning' });
  //await message('File not found', { title: 'Tauri', type: 'error' });
  // if (
  //   await confirm("Would you want to notify ?", {
  //     title: "Tauri",
  //     type: "error",
  //   })
  // ) {
  //   await message("Tauri is awesome", { title: "VCluster", type: "info" });
  // }
};

export const useNotify = () => {
  const provider = useAppSelector((state) => state.permissionReducer);
  return (
    content: string,
    title?: VCluster.Hint<"VCluster">,
    icon?: string
  ) => {
    if (hasPermi(["notify"], provider).result) {
      sendNotification({
        title: title ?? "VCluster",
        body: content,
        icon: icon ?? "vcluster.png",
      });
    } else {
      console.error("VCluster has no permission to notify");
    }
  };
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

export const convertZodErrorToMessageList = (error: Error) => {
  const zodErrorString = error.message as string;
  const zodError = JSON.parse(zodErrorString);
  const messages: string[] = zodError.map(
    (
      err: z.ZodError & {
        path?: string[];
      }
    ) => err.message
  );
  return messages;
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
  const [state, _forceUpdate] = useReducer(
    (state: number, action: { type: VCluster.Hint<"plus"> }) => {
      switch (action.type) {
        case "plus":
          return state + 1;
        default:
          return state;
      }
    },
    0
  );
  const forceUpdate = () => {
    _forceUpdate({ type: "plus" });
  };
  forceUpdate.count = state;
  return forceUpdate;
};

interface Then {
  (fn: Function): any;
}

export const useSafe = <R = any>(fn: Function) => {
  const fn1 = async () => {
    try {
      await fn();
    } catch (error) {
      console.error(error);
    }
  };
  fn1.catch = async (
    handler: (err: any) => R
  ): Promise<(ReturnType<typeof handler> | string) & { then?: Then }> => {
    try {
      await fn();
      return {
        then: (fn2: Function) => {
          return fn2();
        },
      } as any;
    } catch (error: any) {
      return handler(error) ?? (error.message as string);
    }
  };
  return fn1;
};

export function camelToSnakeCase(str: string) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function keysToSnakeCase(obj: any = {}): any {
  const _obj = JSONX.reparse(obj);
  if (Array.isArray(_obj)) {
    // @ts-ignore
    return _obj.map((v) => keysToSnakeCase(v));
  } else if (_obj !== null && _obj.constructor === Object) {
    return Object.keys(_obj).reduce(
      (result, key) => ({
        ...result,
        [camelToSnakeCase(key)]: keysToSnakeCase(_obj[key]),
      }),
      {}
    );
  }
  return _obj;
}

export function snakeToCamelCase(str: string) {
  return str.replace(/(_\w)/g, (letter) => letter[1].toUpperCase());
}

export function keysToCamelCase(obj: any = {}): any {
  const _obj = JSONX.reparse(obj);
  if (Array.isArray(_obj)) {
    // @ts-ignore
    return _obj.map((v) => keysToCamelCase(v));
  } else if (_obj !== null && _obj.constructor === Object) {
    return Object.keys(_obj).reduce(
      (result, key) => ({
        ...result,
        [snakeToCamelCase(key)]: keysToCamelCase(_obj[key]),
      }),
      {}
    );
  }
  return _obj;
}

export function upperCaseFirst(str: string) {
  return str.replace(/^(.)/, (match: string) => match.toUpperCase());
}

export interface UseLoading<
  T extends unknown = Record<string, boolean | number>
> {
  Array(
    loadingMap: T,
    returnType: undefined
  ): readonly [
    typeof loadingMap,
    SetLoading,
    (key: keyof T) => void,
    (key: keyof T) => void,
    (key: keyof T) => void,
    (key: keyof T) => void
  ];
  Object(loadingMap: T): Readonly<{
    values: T;
    set: SetLoading;
    on: (key: keyof T) => void;
    un: (key: keyof T) => void;
    plus: (key: keyof T) => void;
    minus: (key: keyof T) => void;
  }>;
}

export interface SetLoading<
  T = Record<string, boolean | number>,
  K extends keyof T = keyof T
> {
  (key: K, value?: boolean | number): void;
  (key: K, setAction: (pre: boolean | number) => boolean | number): void;
  (state: Record<K, boolean | number>): void;
  (setAction: (pre: T) => T): void;
}

// @ts-ignore
export const useLoading = <
  T extends Record<string, boolean | number> = Record<string, boolean | number>
>(
  loadingMap: T,
  returnType?: "object"
) => {
  const [loading, _setLoading] = useState(loadingMap);
  const setLoading: SetLoading<T, keyof T> = (args1, value = true) => {
    if (typeof args1 === "object") {
      _setLoading((pre) => ({ ...pre, ...args1 }));
      return;
    } else if (typeof args1 === "function") {
      _setLoading((pre) => args1(pre));
      return;
    } else {
      const key = args1;
      if (typeof value === "function") {
        _setLoading((pre) => ({ ...pre, [key]: value(pre[key]) }));
      } else {
        _setLoading((pre) => ({ ...pre, [key]: value }));
      }
    }
  };
  const onLoading = (key: keyof typeof loading) => {
    _setLoading((pre) => ({ ...pre, [key]: 1 }));
  };
  const unLoading = (key: keyof typeof loading) => {
    _setLoading((pre) => ({ ...pre, [key]: 0 }));
  };
  const plusLoading = (key: keyof typeof loading) => {
    _setLoading((pre) => ({ ...pre, [key]: (pre[key] as number) + 1 }));
  };
  const minusLoading = (key: keyof typeof loading) => {
    _setLoading((pre) => ({ ...pre, [key]: (pre[key] as number) - 1 }));
  };
  let returned = null;
  returned = {
    values: loading,
    set: setLoading,
    on: onLoading,
    un: unLoading,
    plus: plusLoading,
    minus: minusLoading,
  } as const;
  return returned as any as ReturnType<UseLoading<T>["Object"]>;
};

export type UseLoadingReturnType<
  T = Record<string, boolean | number>,
  R = "Object" | "Array"
  // @ts-ignore
> = ReturnType<UseLoading<T>[R]>;

export type UseLoadingReturnArray<T = Record<string, boolean | number>> =
  ReturnType<UseLoading<T>["Array"]>;

export type UseLoadingReturnObject<T = Record<string, boolean | number>> =
  ReturnType<UseLoading<T>["Object"]>;

export interface SetReactive<
  T extends Object = {},
  K extends keyof T = keyof T
> {
  (key: K, value?: T[K]): void;
  (key: K, setAction: (pre: T[K]) => T[K]): void;
  (state: T): void;
  (setAction: (pre: T) => T): void;
}

export const useReactive = <T extends Object = {}>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);
  const setReactive: SetReactive<T, keyof T> = (args1, value = undefined) => {
    if (typeof args1 === "object") {
      setState((pre) => ({ ...pre, ...(args1 as T) }));
      return;
    } else if (typeof args1 === "function") {
      setState((pre) => args1(pre));
      return;
    } else {
      const key = args1;
      if (typeof value === "function") {
        setState((pre) => ({ ...pre, [key]: value(pre[key]) }));
      } else {
        setState((pre) => ({ ...pre, [key]: value }));
      }
    }
  };

  return [state, setReactive] as const;
};
