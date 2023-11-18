export type FormSchema = {
  cluster_id: string;
  name: string;
  desc: string;
  useScript: "on" | null;
  "start.path": string;
  "start.script": string;
  useLog: "on" | null;
  log: string;
  useApi: "on" | null;
  "api.live": string;
  "api.start": string;
  "api.stop": string;
  "api.restart": string;
};
export function AppFormSchema(options: {
  required: {
    [K in keyof FormSchema]?: boolean;
  };
}) {
  return {
    cluster_id: {
      value: "",
      required: true,
    },
    name: {
      value: "",
      required: true,
      validator(value) {
        if ((value?.length ?? 0) > 10) {
          return "Name too long";
        }
      },
    },
    desc: {
      value: "",
      required: false,
    },
    useScript: {
      value: null,
      required: options.required.useScript ?? false,
    },
    "start.path": {
      value: "",
      required: options.required.useScript ?? false,
    },
    "start.script": {
      value: "",
      required: options.required.useScript ?? false,
    },
    useLog: {
      value: null,
      required: options.required.useLog ?? false,
    },
    log: {
      value: "",
      required: options.required.useLog ?? false,
    },
    useApi: {
      value: null,
      required: options.required.useApi ?? false,
    },
    "api.live": {
      value: "",
      required: options.required.useApi ?? false,
    },
    "api.start": {
      value: "",
      required: options.required.useApi ?? false,
    },
    "api.stop": {
      value: "",
      required: options.required.useApi ?? false,
    },
    "api.restart": {
      value: "",
      required: options.required.useApi ?? false,
    },
  };
}
