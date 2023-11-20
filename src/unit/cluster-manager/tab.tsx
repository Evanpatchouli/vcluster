import {
  HandleDown,
  HandleRight,
  Loading,
  More,
  Minus as Less,
  Edit,
  Delete,
  Stopwatch,
  Close,
  Forbid,
  Api as ApiIcon,
  Play as GoStart,
  Pause,
  PauseOne,
  Refresh,
  Round as Status,
} from "@icon-park/react";
import {
  Button,
  Card,
  CardContent,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Modal,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./style.css";
import * as Api from "../../api";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { RootState, clustersReducer } from "../../store/store";
import { useAppDispatch } from "../../store/hook";
import {
  setClusters,
  moveOne,
  moveOneApp,
} from "../../store/clusters/clusters.reducer";
import {
  routeTo,
  msgms,
  msg,
  useSafe,
  upperCaseFirst,
  useLoading,
  useNotify,
  useReactive,
  keysToCamelCase,
} from "../../util/util";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Emoji } from "../../util/constans";
import AppCreator from "./app.creator";
import Poptip from "../poptip";
import { useModal } from "../../util/modal";

function mapStateToProps(state: RootState) {
  const { clustersReducer } = state;
  return { pkgs: clustersReducer.clusters };
}

function Tab({ pkgs }: { pkgs: VCluster.PkgConfig[] }) {
  const link = useNavigate();
  const dispatch = useAppDispatch;
  const notify = useNotify();
  useEffect(() => {
    Api.getall_cluster().then((result) => {
      dispatch(
        setClusters(keysToCamelCase(result.data) as VCluster.PkgConfig[])
      );
    });
  }, []);

  const {
    values: loading,
    plus: plusLoading,
    minus: minusLoading,
  } = useLoading(
    {
      alive: false,
      kill: false,
      stop: false,
      stopApi: false,
      relaunch: false,
      relaunchApi: false,
    },
    "object"
  );

  const { 0: status, 1: setStatus } = useReactive({
    app1: "offline" as "online" | "offline",
  });

  const [pkgMenu, setPkgMenu] = useState<VCluster.PkgMenu>({
    show: false,
    anchor: { top: 0, left: 0 },
    idx: 0,
    id: "",
    delModal: false,
  });

  const [delModalMeta, setDelModalMeta] =
    useState<VCluster.ClusterManagerDelModalMeta>({
      confirmLoading: false,
      type: "cluster",
    });

  const delModalConfirmLoading = () =>
    setDelModalMeta((pre) => ({ ...pre, confirmLoading: true }));
  const delModalConfirmLoadingEnd = () =>
    setDelModalMeta((pre) => ({ ...pre, confirmLoading: false }));

  const showPkgMenu = (e: React.MouseEvent, idx: number, id: string) => {
    setPkgMenu((pre) => {
      return {
        show: true,
        anchor: {
          top: e.clientY,
          left: e.clientX,
        },
        idx: idx,
        id: id,
        delModal: false,
      };
    });
  };

  const closePkgMenu = () => {
    setPkgMenu((pre) => {
      return {
        ...pre,
        show: false,
      };
    });
  };

  const [appMenu, setAppMenu] = useState<VCluster.AppMenu>({
    show: false,
    anchor: { top: 0, left: 0 },
    cluster_id: "",
    idx: 0,
    id: "",
  });

  const showAppMenu = (
    e: React.MouseEvent,
    cluster_id: string,
    idx: number,
    id: string
  ) => {
    setAppMenu((pre) => {
      return {
        show: true,
        anchor: {
          top: e.clientY,
          left: e.clientX,
        },
        cluster_id: cluster_id,
        idx: idx,
        id: id,
      };
    });
  };

  const closeAppMenu = () => {
    setAppMenu((pre) => {
      return {
        ...pre,
        show: false,
      };
    });
  };

  const handleAppClick = (idx: number) => {
    // console.log(`idx: ${idx}`);
    setOpen(idx != open ? idx : -1); // check is the clicked cluster opened? if is, close it.
    setSelectedIndex(idx);
    routeTo(`/cluster/${pkgs[idx].id}`, link);
  };

  const unshowDelModal = () => {
    setPkgMenu((pre) => {
      return {
        ...pre,
        delModal: false,
      };
    });
  };

  const delPkgClick = () => {
    setDelModalMeta((pre) => ({
      ...pre,
      type: "cluster",
    }));
    setPkgMenu((pre) => {
      return {
        ...pre,
        delModal: true,
      };
    });
  };

  const delPkg = async () => {
    try {
      const res = await Api.del_cluster_by_pk(pkgMenu.id);
      if (res.ok) {
        msg("Action success", "success");
        dispatch(moveOne(pkgMenu.idx));
        if (pkgMenu.idx == selectedIndex) {
          setOpen(-1);
          setSelectedIndex(-1);
        }
        routeTo("overview", link);
      } else {
        throw new Error(res.msg);
      }
    } catch (error) {
      console.error(error);
      msgms("Action failed", "error");
    }
    closePkgMenu();
  };

  const delAppClick = () => {
    setDelModalMeta((pre) => ({
      ...pre,
      type: "app",
    }));
    setPkgMenu((pre) => {
      return {
        ...pre,
        delModal: true,
      };
    });
  };

  const delApp = async () => {
    try {
      const res = await Api.del_app_by_pk(appMenu.id);
      if (res.ok) {
        msg("Action success", "success");
        // moveOneApp
        dispatch(
          moveOneApp({ cluster_idx: pkgMenu.idx, app_idx: appMenu.idx })
        );
      } else {
        throw new Error(res.msg);
      }
    } catch (error) {
      console.error(error);
      msgms("Action failed", "error");
    }
    closeAppMenu();
  };

  const delModalConfirmClick = async () => {
    delModalConfirmLoading();
    await (delModalMeta.type === "cluster" ? delPkg() : delApp());
    delModalConfirmLoadingEnd();
    unshowDelModal();
  };

  const [open, setOpen] = React.useState(-1);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const handleClusterClick = (idx: number) => {
    // console.log(`idx: ${idx}`);
    setOpen(idx != open ? idx : -1); // check is the clicked cluster opened? if is, close it.
    setSelectedIndex(idx);
    routeTo(`/cluster/${pkgs[idx].id}`, link);
  };

  const handleLanuchClick = async () => {
    Api.launch_pkg_by_id(pkgMenu.id);
    // const res = await Api.launch_pkg_by_id(id);
    // if (!res.ok) {
    //   msgms(res.msg, "error", 3000);
    // }
    closePkgMenu();
  };

  const handlePkgStopClick = async () => {
    Api.stop_pkg_by_id(pkgMenu.id);
    closePkgMenu();
  };

  const handleAppAddClick = () => {
    setAppCreator("open", true);
    closePkgMenu();
  };

  async function launchApp() {
    const id = appMenu.id;
    const res = await Api.launch_app_by_id(id);
    console.debug("launch app res: ", res);
    return res;
  }

  const handleAppLanuchClick = async () => {
    const res = await launchApp();
    if (!res.ok) {
      notify("Launch action fails!");
      return msgms("Launch action fails", "error", 2000);
    } else {
      notify(`Launch app (${getCurApp()?.name}) action done!`);
      msgms("Launch action done", "success", 2000);
    }
    closeAppMenu();
  };

  function getCurApp() {
    return pkgs.find((_pkg, idx) => idx == pkgMenu.idx)?.apps[appMenu.idx];
  }

  async function killApp() {
    const port = getCurApp()?.port;
    const id = appMenu.id;
    return await Api.kill_port(port as number);
  }

  const handleAppKillConfirm = async () => {
    plusLoading("kill");
    const res = await killApp();
    minusLoading("kill");
    if (res.ok) {
      msgms("Kill action done", "success", 2000);
    } else {
      msgms("Kill action fails", "error", 2000);
    }
    closeAppMenu();
  };

  const modal = useModal({
    type: "info",
    children: `Do you confirm to kill the app ? It only works when the app is running locally and the port is occupied.`,
    onConfirm: async (close: Function) => {
      await handleAppKillConfirm();
      close();
    },
  });

  const handleAppKillClick = () => {
    modal.open();
  };

  const handleAppStopClick = async () => {
    const port = getCurApp()?.port;
    const id = appMenu.id;
    const res = await Api.kill_port(port as number);
    if (res.ok) {
      msgms("Stop action done", "success", 2000);
    } else {
      msgms("Stop action fails", "error", 2000);
    }
    closeAppMenu();
  };

  const handleAppRelaunchClick = async () => {
    plusLoading("relaunch");
    await killApp();
    await launchApp();
    minusLoading("relaunch");
    msgms("Relaunch action done", "success", 2000);
    closeAppMenu();
  };

  const [more, setMore] = useState(false);

  const handleMoreClick = () => {
    setMore((pre) => !pre);
  };

  const checkAppAlive = async () => {
    const curApp = getCurApp();
    const port = curApp?.port;
    plusLoading("alive");
    await useSafe(async () => {
      await axios.request({
        url: `http://localhost:${port}`,
        method: "GET",
        timeout: 2000,
      });
      msgms("App is alive", "success", 2000);
      setStatus("app1", "online");
    }).catch((e) => {
      console.error(e);
      const errmsg = upperCaseFirst(e.message || "Request fails");
      msgms(errmsg, "error", 2000);
      setStatus("app1", "offline");
    });
    minusLoading("alive");
  };

  const startAppByApi = async () => {
    const curApp = getCurApp();
    await axios.request({
      url: curApp?.api?.start?.url,
      method: curApp?.api?.start?.method,
    });
  };

  const [appCreator, setAppCreator] = useReactive({
    open: false,
  });

  return (
    <div className="cluster-manager-tab">
      {pkgs.length == 0 ? (
        <div className="no-cluster">
          <FormattedMessage id="You have no cluster." />
        </div>
      ) : null}
      {pkgs.map((pkg, idx) => {
        return (
          <List key={idx} className="app-list">
            <ListItemButton
              onClick={() => handleClusterClick(idx)}
              onContextMenu={(e) => showPkgMenu(e, idx, pkg.id as string)}
              selected={selectedIndex === idx}
            >
              <ListItemText
                primary={
                  open === idx ? (
                    <span>
                      <HandleDown style={{ paddingRight: "0.5rem" }} />
                      <span>{pkg.name}</span>
                    </span>
                  ) : (
                    <span>
                      <HandleRight style={{ paddingRight: "0.5rem" }} />
                      <span>{pkg.name}</span>
                    </span>
                  )
                }
              />
            </ListItemButton>
            <Collapse in={open === idx} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {pkg.apps.map((app, subidx) => {
                  return (
                    <ListItemButton
                      key={subidx}
                      sx={{ pl: 4 }}
                      className="subapp-item"
                      onContextMenu={(e) =>
                        showAppMenu(
                          e,
                          pkg.id as string,
                          subidx,
                          app.id as string
                        )
                      }
                    >
                      <ListItemText
                        style={{ paddingRight: "10rem" }}
                        primary={app.name || "Unknown"}
                      />
                    </ListItemButton>
                  );
                })}
              </List>
            </Collapse>
          </List>
        );
      })}
      <Popover
        className="pkg-menu-wrap"
        open={pkgMenu.show}
        onClose={closePkgMenu}
        anchorReference="anchorPosition"
        anchorPosition={pkgMenu.anchor}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className="pkg-menu">
          <div onClick={handleLanuchClick}>
            <FormattedMessage id="Launch" />
          </div>
          <div onClick={handleLanuchClick}>
            <span>
              <FormattedMessage id="Launch" /> (api)
            </span>
          </div>
          <div>
            <FormattedMessage id="Relaunch" />
          </div>
          <div onClick={handlePkgStopClick}>
            <FormattedMessage id="Stop" />
          </div>
          <div onClick={handlePkgStopClick}>
            <FormattedMessage id="Kill" />
          </div>
          <div>
            <FormattedMessage id="Edit" />
          </div>
          <div onClick={handleAppAddClick}>
            <FormattedMessage id="Add an app" />
          </div>
          <div>
            <FormattedMessage id="Export" />
          </div>
          <div onClick={delPkgClick}>
            <FormattedMessage id="Delete" />
          </div>
        </div>
      </Popover>
      <Popover
        className="app-menu-wrap"
        open={appMenu.show}
        onClose={closeAppMenu}
        anchorReference="anchorPosition"
        anchorPosition={appMenu.anchor}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className="app-menu">
          <div
            onClick={handleAppLanuchClick}
            className="row space-between col-center"
          >
            <FormattedMessage id="Launch" />
            <GoStart />
          </div>
          <div
            onClick={handleAppLanuchClick}
            className="row space-between col-center"
          >
            <span>
              <FormattedMessage id="Launch" /> (api)
            </span>
          </div>
          <div
            onClick={handleAppRelaunchClick}
            className="row space-between col-center"
          >
            <FormattedMessage id="Relaunch" />
            <span className="context-menu-item-icons">
              <Loading
                className={loading.relaunchApi ? "loading-active" : "invisible"}
              />
              <Refresh />
            </span>
          </div>
          <div className="row space-between col-center">
            <span>
              <FormattedMessage id="Relaunch" /> (api)
            </span>
            <span>
              <Loading
                className={loading.relaunchApi ? "loading-active" : "invisible"}
              />
            </span>
          </div>
          <div
            onClick={handleAppStopClick}
            className="row space-between col-center"
          >
            <span>
              <FormattedMessage id="Stop" /> (api)
            </span>
            <span>
              <ApiIcon />
            </span>
          </div>
          <div
            onClick={handleAppKillClick}
            className="row space-between col-center"
          >
            <span>
              <FormattedMessage id="Kill" /> (port)
            </span>
            <span className="context-menu-item-icons">
              <Loading
                className={loading.kill ? "loading-active" : "invisible"}
              />
              <Close />
            </span>
          </div>
          <div className="row space-between col-center">
            <FormattedMessage id="Edit" />
            <Edit />
          </div>
          <div onClick={delAppClick} className="row space-between col-center">
            <FormattedMessage id="Delete" />
            <Delete />
          </div>
          {more && (
            <>
              <div
                onClick={getCurApp()?.useApi ? checkAppAlive : void 0}
                className="row space-between col-center"
              >
                <span>
                  <FormattedMessage id="Alive" /> (api)
                </span>
                <span className="context-menu-item-icons">
                  {!getCurApp()?.useApi ? (
                    <Poptip title="useApi is not opened" placement="top">
                      <Forbid
                        fill="red"
                        onClick={() => {
                          console.log(getCurApp());
                        }}
                      />
                    </Poptip>
                  ) : loading.alive ? (
                    <Loading
                      className={loading.alive ? "loading-active" : "invisible"}
                    />
                  ) : (
                    <Status
                      theme="two-tone"
                      fill={[
                        "#9b9b9b",
                        status.app1 === "online" ? "#b8e986" : "red",
                      ]}
                    />
                  )}
                </span>
              </div>
              <div
                onClick={getCurApp()?.useApi ? startAppByApi : void 0}
                className="row space-between col-center"
              >
                <span>
                  <FormattedMessage id="Start" /> (api)
                </span>
                <span className="context-menu-item-icons">
                  {!getCurApp()?.useApi ? (
                    <Poptip title="useApi is not opened" placement="top">
                      <Forbid fill="red" />
                    </Poptip>
                  ) : null}
                </span>
              </div>
              <div
                onClick={getCurApp()?.useApi ? void 0 : void 0}
                className="row space-between col-center"
              >
                <span>
                  <FormattedMessage id="Stop" /> (api)
                </span>
                <span className="context-menu-item-icons">
                  {!getCurApp()?.useApi ? (
                    <Poptip title="useApi is not opened" placement="top">
                      <Forbid fill="red" />
                    </Poptip>
                  ) : null}
                </span>
              </div>
              <div
                onClick={getCurApp()?.useApi ? void 0 : void 0}
                className="row space-between col-center"
              >
                <span>
                  <FormattedMessage id="Restart" /> (api)
                </span>
                <span className="context-menu-item-icons">
                  {!getCurApp()?.useApi ? (
                    <Poptip title="useApi is not opened" placement="top">
                      <Forbid fill="red" />
                    </Poptip>
                  ) : null}
                </span>
              </div>
            </>
          )}
          <div
            onClick={handleMoreClick}
            className="row space-between col-center"
          >
            <FormattedMessage id={more ? "Less" : "More"} />
            {more ? <Less /> : <More />}
          </div>
        </div>
      </Popover>

      <Modal open={pkgMenu.delModal} onClose={unshowDelModal}>
        <Card className="del-pkg-modal">
          <CardContent className="del-pkg-modal__content">
            <Typography gutterBottom variant="h5" component="div">
              {Emoji.Warning}Warning
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Do you confirm to delete this {delModalMeta.type}?
            </Typography>
          </CardContent>
          <div className="del-pkg-modal__actions">
            <Button
              className="del-pkg-modal__actions__button"
              size="small"
              onClick={unshowDelModal}
              // disabled={delModalMeta.confirmLoading}
            >
              Cancle
            </Button>
            <Button
              className="del-pkg-modal__actions__button"
              size="small"
              variant="contained"
              color="warning"
              onClick={delModalConfirmClick}
              disabled={delModalMeta.confirmLoading}
            >
              <div className="line">
                {delModalMeta.confirmLoading && (
                  <Loading
                    className="loading-active"
                    style={{ marginRight: "0.5em" }}
                  />
                )}
                <span>Confirm</span>
              </div>
            </Button>
          </div>
        </Card>
      </Modal>
      {<modal.Render />}
      <AppCreator
        open={appCreator.open}
        setOpen={(v: boolean) => {
          setAppCreator("open", v);
        }}
        initialData={{
          cluster_id: pkgMenu.id,
        }}
      />
    </div>
  );
}

export default connect(mapStateToProps)(Tab);
