import { keysToSnakeCase, objectifyFlattedFormData } from "../../util/util";

export const formatForm = (_data: any, type: "init" | "submit") => {
  if (type === "init") {
    const form = { ..._data };
    form.use_script = form.use_script ? "on" : null;
    form.use_log = form.use_log ? "on" : null;
    form.use_api = form.use_api ? "on" : null;
    return form;
  } else {
    const data: any = keysToSnakeCase(objectifyFlattedFormData(_data));
    const form = {
      cluster_id: data.cluster_id,
      name: data.name,
      port: Number(data.port),
      desc: data.desc,
      use_script: data.use_script,
      use_log: data.use_log,
      use_api: data.use_api,
      start: {
        path: data.start.path,
        script: data.start.script,
      },
      log: data.log,
      api: {
        alive: {
          url: data.api.alive.url,
          method: data.api.alive.method,
        },
        start: {
          url: data.api.start.url,
          method: data.api.start.method,
        },
        stop: {
          url: data.api.stop.url,
          method: data.api.stop.method,
        },
        restart: {
          url: data.api.restart.url,
          method: data.api.restart.method,
        },
      },
    };
    form.use_script = form.use_script === "on";
    form.use_log = form.use_log === "on";
    form.use_api = form.use_api === "on";
    return form;
  }
};
