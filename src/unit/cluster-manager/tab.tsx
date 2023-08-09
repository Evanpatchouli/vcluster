import { HandleDown, HandleRight } from "@icon-park/react";
import { Collapse, List, ListItemButton, ListItemText, Popover } from "@mui/material";
import React, { useEffect, useState } from "react";
import './style.css'
import * as Api from '../../api';
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { RootState, clustersReducer } from '../../store/store';
import { useAppDispatch } from '../../store/hook';
import { setClusters, moveOne, moveOneApp } from "../../store/clusters/clusters.reducer";
import { routeTo, msgms } from '../../util/util';
import { useNavigate } from "react-router-dom";

function mapStateToProps(state: RootState) {
  const { clustersReducer } = state;
  return { pkgs: clustersReducer.clusters };
}

function Tab({ pkgs }:{pkgs:VCluster.PkgConfig[]}) {
    const link = useNavigate();
  const dispatch = useAppDispatch;
  useEffect(() => {
    Api.getall_cluster().then(result=>{
      // console.log(result);
      dispatch(setClusters(result.data as VCluster.PkgConfig[]));
    })
  }, []);

  const [pkgMenu, setPkgMenu] = useState<VCluster.PkgMenu>({
    show: false,
    anchor: { top: 0, left: 0},
    idx: 0,
    id: ""
  });

  const showPkgMenu = (e: React.MouseEvent, idx: number, id: String) => {
    setPkgMenu(pre => {
      return {
        show: true,
        anchor: {
          top: e.clientY,
          left: e.clientX
        },
        idx: idx,
        id: id
      };
    })
  }

  const closePkgMenu = () => {
    setPkgMenu(pre => {
      return {
        ...pre,
        show: false,
      };
    })   
  }

  const [appMenu, setAppMenu] = useState<VCluster.AppMenu>({
    show: false,
    anchor: { top: 0, left: 0},
    cluster_id: "",
    idx: 0,
    id: ""
  });

  const showAppMenu = (e: React.MouseEvent, cluster_id: String, idx: number, id: String) => {
    setAppMenu(pre => {
      return {
        show: true,
        anchor: {
          top: e.clientY,
          left: e.clientX
        },
        cluster_id: cluster_id,
        idx: idx,
        id: id
      };
    })
  }

  const closeAppMenu = () => {
    setAppMenu(pre => {
      return {
        ...pre,
        show: false,
      };
    })   
  }

  const handleAppClick = (idx: number) => {
    // console.log(`idx: ${idx}`);
    setOpen(idx!=open ? idx : -1);  // check is the clicked cluster opened? if is, close it.
    setSelectedIndex(idx);
    routeTo(`/cluster/${pkgs[idx].id}`, link);
  };

  const delPkg = async ()=> {
    const res = await Api.del_cluster_by_pk(pkgMenu.id);
    if (res.ok) {
      dispatch(moveOne(pkgMenu.idx));
      if(pkgMenu.idx == selectedIndex){
        setOpen(-1);
        setSelectedIndex(-1);
      }
      routeTo("overview", link);
    }
    closePkgMenu();
  }

  const delApp = async ()=> {
    const res = await Api.del_app_by_pk(appMenu.id);
    if (res.ok) {// moveOneApp
      dispatch(moveOneApp({ cluster_idx:pkgMenu.idx, app_idx:appMenu.idx }));
    }
    closeAppMenu();
  }

  const [open, setOpen] = React.useState(-1);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const handleClusterClick = (idx: number) => {
    // console.log(`idx: ${idx}`);
    setOpen(idx!=open ? idx : -1);  // check is the clicked cluster opened? if is, close it.
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
  }

  const handlePkgStopClick = async () => {
    Api.stop_pkg_by_id(pkgMenu.id);
    closePkgMenu();
  }

  const handleAppLanuchClick = async () => {
    const id = appMenu.id;
    const res = Api.launch_app_by_id(id);
    // console.log(res);
    // if (!res.ok) {
    //   return msgms(res.msg, "error", 3000);
    // }
    closeAppMenu();
  }

  const handleAppStopClick = async () => {
    const port = pkgs.find((_pkg,idx) => idx == pkgMenu.idx)?.apps[appMenu.idx].port;
    const id = appMenu.id;
    const res = Api.kill_port(port as number);
    closeAppMenu();
  }

  return (
    <div className="cluster-manager-tab">
      {pkgs.length==0? <div className="no-cluster"><FormattedMessage id="You have no cluster."/></div> : null}
      {pkgs.map((pkg, idx) => {
        return (
          <List key={idx}>
            <ListItemButton onClick={()=>handleClusterClick(idx)}
            onContextMenu={(e)=>showPkgMenu(e,idx, pkg.id as String)}
            selected={selectedIndex === idx}>
              <ListItemText primary={open===idx ? 
                <span>
                  <HandleDown style={{paddingRight:"0.5rem"}} />
                  <span>{pkg.name}</span>
                </span>
                :
                <span>
                  <HandleRight style={{paddingRight:"0.5rem"}} />
                  <span>{pkg.name}</span>
                </span>
              } />
            </ListItemButton>
            <Collapse in={open === idx} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {
                  pkg.apps.map((app,subidx)=>{
                    return (
                      <ListItemButton key={subidx} sx={{ pl: 4 }}
                      onContextMenu={(e)=>showAppMenu(e,pkg.id as String,idx, app.id as String)}>
                        <ListItemText style={{paddingRight:"10rem"}} primary={app.name} />
                      </ListItemButton>
                    )
                  })
                }
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
          <div onClick={handleLanuchClick}><FormattedMessage id="Launch"/></div>
          <div><FormattedMessage id="Relaunch"/></div>
          <div onClick={handlePkgStopClick}><FormattedMessage id="Stop"/></div>
          <div><FormattedMessage id="Edit"/></div>
          <div><FormattedMessage id="Export"/></div>
          <div onClick={delPkg}><FormattedMessage id="Delete"/></div>
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
          <div onClick={handleAppLanuchClick}><FormattedMessage id="Launch"/></div>
          <div><FormattedMessage id="Relaunch"/></div>
          <div onClick={handleAppStopClick}><FormattedMessage id="Stop"/></div>
          <div><FormattedMessage id="Edit"/></div>
          <div onClick={delApp}><FormattedMessage id="Delete"/></div>
        </div>
      </Popover>
    </div>
  );
}

export default connect(mapStateToProps)(Tab);
