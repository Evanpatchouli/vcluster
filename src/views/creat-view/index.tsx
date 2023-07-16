import { FormattedMessage, useIntl } from "react-intl";
import "./style.css";
import React, { Fragment } from "react";
import { Delete } from "@icon-park/react";
import { ServiceConfig } from "../../model/VCluster";
import { createCluster, getall_cluster } from "../../api";
import { closeMsg, showMsg } from "../../store/msg/msg.reducer";
import { useAppDispatch } from "../../store/hook";
import { msg2s } from "../../util/util";

function CreatView() {
  const intl = useIntl();
  const [apps, setApps] = React.useState<VCluster.ServiceConfig[]>([new ServiceConfig()]);
  const [appDoms, setAppDoms] = React.useState(getAppDoms);
  const [pkg, setPkg] = React.useState<VCluster.PkgConfig>({
    name: '', desc: '', apps
  })
  const getForm = ()=> {
    let form = pkg;
    form.apps = apps;
    return form;
  }

  function getAppDoms() {
    return apps.map((app, idx) => (
      <Fragment key={idx}>
        <div className="row" id="sub-app-top">
          <div className="plain-row">
            <input
              title="subapp-name"
              onChange={(e)=>{
                app.name = e.target.value;
                apps[idx] = app;
                setApps(apps);
              }}
              placeholder={intl.formatMessage({
                id: "please input sub-app name...",
              })}
            ></input>
            <input className="subpp-port"
              type="number"
              title="subapp-port"
              onChange={(e)=>{
                app.port = Number(e.target.value);
                apps[idx] = app;
                setApps(apps);
              }}
              placeholder={intl.formatMessage({
                id: "sub-app port",
              })}
            ></input>
          </div>
          {idx === 0 ? null : <button title="delete" type="button"
          onClick={()=>delSubApp(idx)}><Delete/></button>}
        </div>
        <div className="row">
          <textarea
            className="desc"
            title="subapp-desc"
            onChange={(e)=>{
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
          <input
            className="path"
            title="current-dir"
            onChange={(e)=>{
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
            title="start-script"
            onChange={(e)=>{
              app.start.script = e.target.value;
              apps[idx] = app;
              setApps(apps);
            }}
            placeholder={intl.formatMessage({
              id: "the commands or relative path of the script file to start app...",
            })}
          ></input> 
        </div>
        <div className="row">
          <input
            className="path"
            title="start-script"
            onChange={(e)=>{
              app.log = e.target.value;
              apps[idx] = app;
              setApps(apps);
            }}
            placeholder={intl.formatMessage({
              id: "sub-app log file relative path, default is current-dir/log.txt",
            })}
          ></input> 
        </div>
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
    setApps(apps.filter((app,idx) => idx !== index));
  }

  React.useEffect(() => {
    console.log("update sub app list");
    setAppDoms(getAppDoms());
  }, [apps]);

  return (
    <div className="CreateView">
      <form className="form"
      onSubmit={async (e)=>{
        e.preventDefault();
        const form = getForm();
        if (!form.name||!form.apps) {
          return msg2s(intl.formatMessage({
            id: "please fill in completely",
          }), "warning")
        }
        const res = await createCluster(form);
        console.log(res);
        if (res.ok) {
          msg2s(intl.formatMessage({
            id: "create successfully",
          }), "success");
        }
      }}>
        <h1 className="htitle"><FormattedMessage id="Configure this cluster"/></h1>
        <div className="row">
          <input
            title="cluster-name"
            onChange={(e)=>{
              let newpkg = pkg;
              newpkg.name = e.target.value;
              setPkg(newpkg);
            }}
            placeholder={intl.formatMessage({
              id: "please input cluster name...",
            })}
          ></input>
        </div>
        <div className="row">
          <textarea className="desc"
            title="cluster-desc"
            onChange={(e)=>{
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
            <button type="reset" onClick={()=>{
              setApps([new ServiceConfig()]);
            }}>
              {intl.formatMessage({ id: "reset" })}
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
