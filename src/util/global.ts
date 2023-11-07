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

declare global {
  interface Window {
    JSONX: {
      restringify: typeof _JSONX.restringify;
      stringify: typeof _JSONX.stringify;
      reparse: typeof _JSONX.reparse;
      parse: typeof _JSONX.parse;
    };
  }

  const JSONX: typeof _JSONX;
}

window.JSONX = _JSONX;
