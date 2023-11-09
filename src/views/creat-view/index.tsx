import { FormattedMessage, useIntl } from "react-intl";
import "./style.css";
import React, { Fragment } from "react";
import { Delete, Spanner } from "@icon-park/react";
import { PkgConfig, ServiceConfig } from "../../model/VCluster";
import { createCluster } from "../../api";
import {
  convertZodErrorToMessageList,
  msg,
  msg3s,
  useForceUpdate,
  useSafe,
} from "../../util/util";
import { AppsValidor, PkgValidor } from "./valid";
import { InputLabel, Switch } from "@mui/material";
import Label from "../../unit/Label";

function CreatView() {
  const intl = useIntl();
  const forceUpdate = useForceUpdate();
  const [apps, _setApps] = React.useState<VCluster.ServiceConfig[]>([
    new ServiceConfig(),
  ]);
  const setApps: typeof _setApps = (state) => {
    _setApps(state);
    forceUpdate();
  };
  const [, setAppDoms] = React.useState(getAppDoms);
  const [pkg, setPkg] = React.useState<VCluster.PkgConfig>(new PkgConfig());
  const getForm = () => {
    let form = pkg;
    form.apps = apps;
    return form;
  };

  function getAppDoms() {
    return apps.map((app, idx) => (
      <Fragment key={idx}>
        <div className="row" id="sub-app-top">
          <div className="plain-row">
            <input
              title="name of the app"
              onChange={(e) => {
                app.name = e.target.value;
                apps[idx] = app;
                setApps(apps);
              }}
              placeholder={intl.formatMessage({
                id: "please input sub-app name...",
              })}
            ></input>
            <input
              className="subpp-port"
              type="number"
              title="port of this app"
              onChange={(e) => {
                app.port = Number(e.target.value);
                apps[idx] = app;
                setApps(apps);
              }}
              placeholder={intl.formatMessage({
                id: "sub-app port",
              })}
            ></input>
          </div>
          {idx === 0 ? null : (
            <button title="delete" type="button" onClick={() => delSubApp(idx)}>
              <Delete />
            </button>
          )}
        </div>
        <div className="row">
          <textarea
            className="desc"
            title="description of this subapp"
            onChange={(e) => {
              app.desc = e.target.value;
              apps[idx] = app;
              setApps(apps);
            }}
            placeholder={intl.formatMessage({
              id: "please input description...",
            })}
          ></textarea>
        </div>
        <div className="row">
          <Label required={app.useScript} text="Start app by script : ">
            <Switch
              checked={app.useScript}
              onChange={(e) => {
                console.debug(app);
                app.useScript = e.target.checked;
                apps[idx] = app;
                setApps(apps);
              }}
            />
          </Label>
        </div>
        {app.useScript && (
          <>
            <div className="row">
              <input
                className="path"
                title={intl.formatMessage({
                  id: "current-dir where to execute script...",
                })}
                onChange={(e) => {
                  app.start.path = e.target.value;
                  apps[idx] = app;
                  setApps(apps);
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
                onChange={(e) => {
                  app.start.script = e.target.value;
                  apps[idx] = app;
                  setApps(apps);
                }}
                placeholder={intl.formatMessage({
                  id: "the commands or relative path of the script file to start app...",
                })}
              ></input>
            </div>
          </>
        )}
        <div className="row">
          <Label required={app.useLog} text="Log outputs : ">
            <Switch
              checked={app.useLog}
              onChange={(e) => {
                console.debug(app);
                app.useLog = e.target.checked;
                apps[idx] = app;
                setApps(apps);
              }}
            />
          </Label>
        </div>
        {app.useLog && (
          <div className="row">
            <input
              className="path"
              title="log file path of console outputs"
              onChange={(e) => {
                app.log = e.target.value;
                apps[idx] = app;
                setApps(apps);
              }}
              placeholder={intl.formatMessage({
                id: "sub-app log file relative path, default is current-dir/log.txt",
              })}
            ></input>
          </div>
        )}
        <div className="row">
          <Label required={app.useApi} text="Use apis : ">
            <Switch
              checked={app.useApi}
              onChange={(e) => {
                console.debug(
                  `app::${idx}.useApi=${app.useApi} => ${e.target.checked}`
                );
                app.useApi = e.target.checked;
                apps[idx] = app;
                setApps(apps);
              }}
            />
          </Label>
        </div>
        {app.useApi && (
          <>
            <div className="row">
              <input
                className="api-live"
                title="api of checking is this app alive"
                onChange={(e) => {
                  app.api = app.api ?? {};
                  app.api.live = e.target.value;
                  apps[idx] = app;
                  setApps(apps);
                }}
                placeholder={intl.formatMessage({
                  id: "request api for checking live...",
                })}
              />
            </div>
            <div className="row">
              <input
                className="api-start"
                title="api of starting up this app"
                onChange={(e) => {
                  app.api = app.api ?? {};
                  app.api.start = e.target.value;
                  apps[idx] = app;
                  setApps(apps);
                }}
                placeholder={intl.formatMessage({
                  id: "request api for checking start...",
                })}
              />
            </div>
            <div className="row">
              <input
                className="api-stop"
                title="api of stopping thi app"
                onChange={(e) => {
                  app.api = app.api ?? {};
                  app.api.stop = e.target.value;
                  apps[idx] = app;
                  setApps(apps);
                }}
                placeholder={intl.formatMessage({
                  id: "request api for checking stop...",
                })}
              />
            </div>
          </>
        )}
        <div className="row" id="sub-app-bottom" />
      </Fragment>
    ));
  }

  function addSubApp() {
    console.log("add a new sub app");
    const app = new ServiceConfig();
    setApps((pre) => [...pre, app]);
  }

  function delSubApp(index: number) {
    console.log("del a new sub app");
    setApps(apps.filter((app, idx) => idx !== index));
  }

  React.useEffect(() => {
    console.log("update sub app list");
    setAppDoms(getAppDoms());
  }, [apps]);

  return (
    <div className="CreateView">
      <form
        className="form"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = getForm();
          console.log(form);
          let valid_result = PkgValidor.safeParse(form);
          if (!valid_result.success) {
            const firsetError: VCluster.ZodErrorMessage = JSON.parse(
              valid_result.error.message
            )[0];
            console.error(firsetError.message);
            return msg3s(
              intl.formatMessage({
                id: firsetError.message,
              }),
              "warning"
            );
          }
          const appsValidor = AppsValidor(form.apps);
          useSafe<boolean>(() => {
            appsValidor.forEach((validor, idx) => {
              validor.parse(form.apps[idx]);
            });
          })
            .catch((error: any) => {
              const errMsgs = convertZodErrorToMessageList(error);
              console.error(errMsgs);
              msg(
                intl.formatMessage({
                  id: errMsgs[0] ?? "Unknown error",
                }),
                "warning"
              );
              return false;
            })
            .then?.(async () => {
              const res = await createCluster(form);
              console.log(res);
              if (res.ok) {
                msg(
                  intl.formatMessage({
                    id: "create successfully",
                  }),
                  "success"
                );
              }
            });
        }}
      >
        <h1 className="htitle">
          <Spanner style={{ marginRight: "1rem" }} />
          <FormattedMessage id="Configure this cluster" />
        </h1>
        <div className="row">
          <input
            title="name of the cluster"
            onChange={(e) => {
              let newpkg = pkg;
              newpkg.name = e.target.value;
              setPkg(newpkg);
            }}
            placeholder={intl.formatMessage({
              id: "please input cluster name...",
            })}
          ></input>
        </div>
        <div className="row" id="cluster-bottom">
          <textarea
            className="desc"
            title="description of the cluster"
            onChange={(e) => {
              let newpkg = pkg;
              newpkg.desc = e.target.value;
              setPkg(newpkg);
            }}
            placeholder={intl.formatMessage({
              id: "please input description...",
            })}
          ></textarea>
        </div>
        {getAppDoms()}
        <div className="row">
          <div className="plain-row">
            <button type="submit">
              {intl.formatMessage({ id: "submit" })}
            </button>
            <button
              type="reset"
              onClick={() => {
                setApps([new ServiceConfig()]);
              }}
            >
              {intl.formatMessage({ id: "reset" })}
            </button>
            <button type="button">
              {intl.formatMessage({ id: "save as template" })}
            </button>
          </div>
          <button type="button" onClick={addSubApp}>
            {intl.formatMessage({ id: "Add sub-app" })}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatView;
