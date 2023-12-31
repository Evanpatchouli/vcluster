import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  MenuItem,
  Select,
  Switch,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import { keysToCamelCase, msg, useReactive } from "../../util/util";
import useForm from "../../util/form";
import Label from "../Label";
import Api from "../../api";
import { ServiceConfig } from "../../model/VCluster";
import { useIntl } from "react-intl";
import { AppFormSchema, FormSchema } from "./form.schema";
import { formatForm } from "./formatter";
import { useAppDispatch } from "../../store/hook";
import { setClusters } from "../../store/clusters/clusters.reducer";
import { Locale } from "../../locale/en_US";
import ApiInput from "../api-input/api.input";
import { Method } from "axios";

export type AppCreatorProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  initialData?: Partial<VCluster.PkgConfig>;
  type?: "create" | "edit";
};

const AppCreator: React.FC<AppCreatorProps> = (props) => {
  const intl = useIntl();
  const dispatch = useAppDispatch;
  const formRef = useRef<HTMLFormElement>(null);
  const [app, appSetter] = useReactive({
    name: "",
    port: void 0 as number | undefined,
    desc: "",
    useScript: 0,
    useLog: 0,
    useApi: 0,
    start: {
      path: "",
      script: "",
    },
    api: {
      alive: {
        method: "GET" as Method,
        url: "",
      },
      start: {
        method: "GET" as Method,
        url: "",
      },
      stop: {
        method: "GET" as Method,
        url: "",
      },
      restart: {
        method: "GET" as Method,
        url: "",
      },
    },
  });
  const form = useForm<FormSchema>(
    AppFormSchema({
      required: {
        useScript: boolify(app.useScript),
        useLog: boolify(app.useLog),
        useApi: boolify(app.useApi),
      },
    }),
    formRef
  );

  function reset() {
    appSetter({
      name: "",
      port: void 0,
      desc: "",
      useScript: 0,
      useLog: 0,
      useApi: 0,
      start: {
        path: "",
        script: "",
      },
      api: {
        alive: {
          method: "GET",
          url: "",
        },
        start: {
          method: "GET",
          url: "",
        },
        stop: {
          method: "GET",
          url: "",
        },
        restart: {
          method: "GET",
          url: "",
        },
      },
    });
    void 0;
  }

  const handleCancelClick = () => {
    props.setOpen(false);
    form.reset();
    reset();
  };

  return (
    <Dialog
      className="app-creator"
      open={props.open}
      onClose={() => props.setOpen(false)}
    >
      <form
        className="app-creator-form"
        ref={formRef}
        onSubmit={form.onSubmit((formData) => {
          const postData: ServiceConfig = formatForm(formData, "submit");
          console.log(formatForm(postData, "submit"));
          Api.create_app(
            ServiceConfig.newfromApp({
              ...postData,
            })
          )
            .then((res) => {
              if (!res.ok) {
                msg(res.msg, "error");
              } else {
                msg("App created successfully", "success");
                props.setOpen(false);
                form.reset();
                reset();
                Api.getall_cluster()
                  .then((result) => {
                    dispatch(setClusters(keysToCamelCase(result.data) as VCluster.PkgConfig[]));
                  })
                  .catch((err) => {
                    msg(err.msg, "error");
                  });
              }
            })
            .catch((err) => {
              msg(err.msg, "error");
            });
        }, true)}
      >
        <DialogTitle textAlign={"left"}>
          <Typography variant={"h5"} style={{ fontWeight: "bold" }}>
            {intl.formatMessage({
              id:
                (props.type ?? "create") === "create"
                  ? "$createAppTitle"
                  : ("$editAppTitle" as Locale),
            })}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <input
            title="clusster_id of the app"
            name="cluster_id"
            type="hidden"
            value={props.initialData?.cluster_id}
          ></input>
          <div className="row">
            <div className="app-creator-form__name-port">
              <input
                title="name of the app"
                name="name"
                placeholder={intl.formatMessage({
                  id: "please input sub-app name...",
                })}
              ></input>
              <input
                className="app-creator-form__name-port__subapp-port"
                type="number"
                title="port of this app"
                name="port"
                placeholder={intl.formatMessage({
                  id: "sub-app port",
                })}
              ></input>
            </div>
          </div>
          <div className="row">
            <textarea
              className="desc"
              name="desc"
              title="description of this subapp"
              style={{
                width: "100%",
              }}
              onChange={(e) => {
                // app.desc = e.target.value;
                // apps[idx] = app;
                // setApps(apps);
              }}
              placeholder={intl.formatMessage({
                id: "please input description...",
              })}
            ></textarea>
          </div>
          <div className="row">
            <Label
              required={boolify(app.useScript)}
              text={`${intl.formatMessage({
                id: "Start app by script" as Locale,
              })} : `}
              color="primary"
            >
              <Switch
                checked={boolify(app.useScript)}
                name="useScript"
                onChange={(e) => {
                  // console.debug(app);
                  app.useScript = numberify(e.target.checked);
                  appSetter("useScript", app.useScript);
                }}
              />
            </Label>
          </div>
          {boolify(app.useScript) && (
            <>
              <div className="row">
                <input
                  className="path"
                  title={intl.formatMessage({
                    id: "current-dir where to execute script...",
                  })}
                  name="start.path"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    // app.start.path = e.target.value;
                    // apps[idx] = app;
                    // setApps(apps);
                  }}
                  placeholder={intl.formatMessage({
                    id: "current-dir where to execute script...",
                  })}
                ></input>
              </div>
              <div className="row">
                <input
                  className="path"
                  title={intl.formatMessage({
                    id: "the commands or relative path of the script file to start app...",
                  })}
                  name="start.script"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    // app.start.script = e.target.value;
                    // apps[idx] = app;
                    // setApps(apps);
                  }}
                  placeholder={intl.formatMessage({
                    id: "the commands or relative path of the script file to start app...",
                  })}
                ></input>
              </div>
            </>
          )}
          <div className="row">
            <Label
              required={boolify(app.useLog)}
              text={`${intl.formatMessage({
                id: "Log outputs" as Locale,
              })} : `}
              color="primary"
            >
              <Switch
                checked={boolify(app.useLog)}
                name="useLog"
                onChange={(e) => {
                  app.useLog = numberify(e.target.checked);
                  appSetter("useLog", app.useLog);
                }}
              />
            </Label>
          </div>
          {boolify(app.useLog) && (
            <div className="row">
              <input
                className="path"
                title="log file path of console outputs"
                name="log"
                placeholder={intl.formatMessage({
                  id: "sub-app log file relative path, default is current-dir/log.txt",
                })}
                style={{ width: "100%" }}
              ></input>
            </div>
          )}
          <div className="row">
            <Label
              required={boolify(app.useApi)}
              text={`${intl.formatMessage({
                id: "Use apis" as Locale,
              })} : `}
              color="primary"
            >
              <Switch
                checked={boolify(app.useApi)}
                name="useApi"
                onChange={(e) => {
                  app.useApi = numberify(e.target.checked);
                  appSetter("useApi", app.useApi);
                }}
              />
            </Label>
          </div>
          {boolify(app.useApi) && (
            <>
              <div className="row">
                <ApiInput
                  label={intl.formatMessage({
                    id: "$aliveApiDesc" as Locale,
                  })}
                  placeholder={intl.formatMessage({
                    id: "$aliveApiDesc" as Locale,
                  })}
                  title="api of checking if this app is alive"
                  name="api.alive.url"
                  defaultValue={app.api.alive.url}
                  method={app.api.alive.method}
                  methodName="api.alive.method"
                />
              </div>
              <div className="row">
                <ApiInput
                  label={intl.formatMessage({
                    id: "$startApiDesc" as Locale,
                  })}
                  placeholder={intl.formatMessage({
                    id: "$startApiDesc" as Locale,
                  })}
                  title="api of starting up this app"
                  name="api.start.url"
                  defaultValue={app.api.start.url}
                  method={app.api.start.method}
                  methodName="api.start.method"
                />
              </div>
              <div className="row">
                <ApiInput
                  label={intl.formatMessage({
                    id: "$stopApiDesc" as Locale,
                  })}
                  placeholder={intl.formatMessage({
                    id: "$stopApiDesc" as Locale,
                  })}
                  title="api of stopping this app"
                  name="api.stop.url"
                  defaultValue={app.api.stop.url}
                  method={app.api.stop.method}
                  methodName="api.stop.method"
                />
              </div>
              <div className="row">
                <ApiInput
                  label={intl.formatMessage({
                    id: "$restartApiDesc" as Locale,
                  })}
                  placeholder={
                    intl.formatMessage({
                      id: "$restartApiDesc" as Locale,
                    }) + "..."
                  }
                  title="api of restarting up this app"
                  name="api.restart.url"
                  defaultValue={app.api.restart.url}
                  method={app.api.restart.method}
                  methodName="api.restart.method"
                />
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions className="app-creator-form__footer">
          <Button type="button" variant="text" onClick={handleCancelClick}>
            {intl.formatMessage({
              id: "cancel" as Locale,
            })}
          </Button>
          <Button type="reset" variant="text" onClick={reset}>
            {intl.formatMessage({
              id: "reset" as Locale,
            })}
          </Button>
          <Button type="submit" variant="contained">
            {intl.formatMessage({
              id: "submit" as Locale,
            })}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AppCreator;
