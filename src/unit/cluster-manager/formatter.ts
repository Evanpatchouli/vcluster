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
        live: data.api.live,
        start: data.api.start,
        stop: data.api.stop,
        restart: data.api.restart,
      },
    };
    form.use_script = form.use_script === "on";
    form.use_log = form.use_log === "on";
    form.use_api = form.use_api === "on";
    return form;
  }
};
