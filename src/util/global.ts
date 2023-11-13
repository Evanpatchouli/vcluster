export {};

const _JSONX = {
  stringify: JSON.stringify,
  parse: JSON.parse,
  reparse: (
    value: any,
    replacer?: ((this: any, key: string, value: any) => any) | undefined,
    space?: string | number | undefined
  ) => {
    try {
      const text = JSON.stringify(value, replacer, space);
      return JSON.parse(text);
    } catch (error) {
      console.error(error);
      return value;
    }
  },
  restringify: (
    text: string,
    reviver?: (this: any, key: string, value: any) => any
  ) => {
    try {
      const obj = JSON.parse(text, reviver);
      return JSON.stringify(obj);
    } catch (error) {
      console.error(error);
      return `${text}`;
    }
  },
};

function boolify(value: any) {
  if (value) return true;
  return false;
}

function numberify(value: any) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    if (["true", "yes", "on"].includes(value.toLowerCase())) return 1;
    if (["false", "no", "off"].includes(value.toLowerCase())) return 0;
    return Number(value);
  }
  if (value) {
    return 1;
  } else {
    return 0;
  }
}

declare global {
  interface Window {
    JSONX: {
      restringify: typeof _JSONX.restringify;
      stringify: typeof _JSONX.stringify;
      reparse: typeof _JSONX.reparse;
      parse: typeof _JSONX.parse;
    };
    boolify(value: any): boolean;
    numberify(value: any): number;
  }

  const JSONX: typeof _JSONX;
  function boolify(value: any): boolean;
  function numberify(value: any): number;
}

window.JSONX = _JSONX;
window.boolify = boolify;
window.numberify = numberify;
