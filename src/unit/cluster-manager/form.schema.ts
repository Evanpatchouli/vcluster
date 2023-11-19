import { Method } from "axios";

export type FormSchema = {
  cluster_id: string;
  name: string;
  port: number;
  desc: string;
  useScript: "on" | null;
  "start.path": string;
  "start.script": string;
  useLog: "on" | null;
  log: string;
  useApi: "on" | null;
  "api.alive.url": string;
  "api.alive.method": Method;
  "api.start.url": string;
  "api.start.method": Method;
  "api.stop.url": string;
  "api.stop.method": Method;
  "api.restart.url": string;
  "api.restart.method": Method;
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
      validator(value: any) {
        if ((value?.length ?? 0) > 10) {
          return "Name too long";
        }
      },
    },
    port: {
      value: "",
      required: true,
      validator(value: any) {
        if (isNaN(value)) {
          return "Port must be a number";
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
    "api.alive.url": {
      value: "",
      required: options.required.useApi ?? false,
    },
    "api.alive.method": {
      value: "GET",
      required: options.required.useApi ?? false,
    },
    "api.start.url": {
      value: "",
      required: options.required.useApi ?? false,
    },
    "api.start.method": {
      value: "GET",
      required: options.required.useApi ?? false,
    },
    "api.stop.url": {
      value: "",
      required: options.required.useApi ?? false,
    },
    "api.stop.method": {
      value: "GET",
      required: options.required.useApi ?? false,
    },
    "api.restart.url": {
      value: "",
      required: options.required.useApi ?? false,
    },
    "api.restart.method": {
      value: "GET",
      required: options.required.useApi ?? false,
    },
  };
}
