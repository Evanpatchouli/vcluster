import { useIntl } from "react-intl";
import "./style.css";
import React, { Fragment } from "react";
import { Delete } from "@icon-park/react";

function CreatView() {
  const intl = useIntl();
  const [apps, setApps] = React.useState([{ name: "sub-app", desc: "" }]);
  const [appDoms, setAppDoms] = React.useState(getAppDoms);

  function getAppDoms() {
    return apps.map((app, idx) => (
      <Fragment>
        <div key={idx} className="row">
          <input
            title="cluster-name"
            placeholder={intl.formatMessage({
              id: "please input sub-app name...",
            })}
          ></input>
          {idx === 0 ? null : <button title="delete" type="button"
          onClick={()=>delSubApp(idx)}><Delete/></button>}
        </div>
        <div className="row">
          <textarea
            className="desc"
            title="cluster-name"
            placeholder={intl.formatMessage({
              id: "please input description...",
            })}
          ></textarea>
        </div>
      </Fragment>
    ));
  }

  function addSubApp() {
    console.log("add a new sub app");
    const app = { name: "232", desc: "" };
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
      <form className="form">
        <div className="row">
          <input
            title="cluster-name"
            placeholder={intl.formatMessage({
              id: "please input cluster name...",
            })}
          ></input>
        </div>
        <div className="row">
          <input
            title="cluster-name"
            placeholder={intl.formatMessage({
              id: "please input description...",
            })}
          ></input>
        </div>
        {getAppDoms()}
        <div className="row">
          <button type="button" onClick={addSubApp}>
            {intl.formatMessage({ id: "Add sub-app" })}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatView;
