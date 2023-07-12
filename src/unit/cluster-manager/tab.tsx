import { HandleDown, HandleRight } from "@icon-park/react";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";

function Tab() {
  const pkgs: VCluster.PkgConfig[] | null = [
    { name: "cluster-1", desc: "", apps: [
      { name: "app1", desc: "", port: 3000,
        start: { path: "", script: "" }
      },
      { name: "app2", desc: "", port: 3000,
        start: { path: "", script: "" }
      },
      { name: "app3", desc: "", port: 3000,
        start: { path: "", script: "" }
      }
    ] },
    { name: "cluster-2", desc: "", apps: [
      { name: "app1", desc: "", port: 3000,
        start: { path: "", script: "" }
      }
    ] },
    { name: "cluster-3", desc: "", apps: [
      { name: "app1", desc: "", port: 3000,
        start: { path: "", script: "" }
      }
    ] },
  ];

  const [open, setOpen] = React.useState(-1);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = (idx: number) => {
    console.log(`idx: ${idx}`);
    setOpen(idx!=open ? idx : -1);  // check is the clicked cluster opened? if is, close it.
    setSelectedIndex(idx);
  };

  return (
    <div>
      {pkgs.map((pkg, idx) => {
        return (
          <List key={idx}>
            <ListItemButton onClick={()=>handleClick(idx)}
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
                      <ListItemButton key={subidx} sx={{ pl: 4 }}>
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
    </div>
  );
}

export default Tab;
