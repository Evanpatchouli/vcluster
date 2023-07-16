import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import './style.css';
import { RootState } from "../../store/store";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

const SPOT_STATE = {
  SLEEP: "SLEEP",
  WELL: "WELL",
  BAD: "BAD",
  STOP: "STOP",
}

const COLOR_MAP: {[x:string]:string} = {
  SLEEP: "#e8d8ff",
  WELL: "LawnGreen",
  BAD: "OrangeRed",
  STOP: "DarkGray",
}

function mapStateToProps(state: RootState) {
  const { clustersReducer } = state;
  return { pkgs: clustersReducer.clusters };
}

function ClusterOverviewView({ pkgs }:{pkgs:VCluster.PkgConfig[]}) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chartRef.current?.focus();
    let chartInstance = echarts.init(chartRef.current as unknown as HTMLElement);
    chartInstance.on('click', function(params) {
      console.log(params);
      if (params.componentType === 'markPoint') {
        // 点击到了 markPoint 上
        if (params.seriesIndex === 5) {
          // 点击到了 index 为 5 的 series 的 markPoint 上。
        }
      } else if (params.componentType === 'series') {
        if (params.seriesType === 'graph') {
          if (params.dataType === 'edge') {
            // 点击到了 graph 的 edge（边）上。
          } else {
            // 点击到了 graph 的 node（节点）上。
          }
        }
      }
    });
    let spots = pkgs.map((pkg,idx) => {
      let spot = {
        ...pkg,
        symbolSize: 50,
        draggable: true,
        state: SPOT_STATE.SLEEP
      }
      switch(idx) { //模拟不同状态的集群的颜色
        case 0: {
          spot.state = SPOT_STATE.WELL;
          break;
        }
        case 1: {
          spot.state = SPOT_STATE.SLEEP
          break;
        }
        case 2: {
          spot.state = SPOT_STATE.SLEEP
          break;
        }
        case 3: {
          spot.state = SPOT_STATE.SLEEP
          break;
        }
        case 4: {
          spot.state = SPOT_STATE.WELL
          break;
        }
        case 5: {
          spot.state = SPOT_STATE.BAD
          break;
        }
        case 6: {
          spot.state = SPOT_STATE.WELL
          break;
        }
      }
      const sizes = [0,40,60,80,100,120,140,160];
      spot.symbolSize = sizes[pkg.apps.length]
      if(pkg.apps.length > sizes.length){
        spot.symbolSize = 200;
      }
      return spot;
    })
    const data = spots;
    // const data: Spot[] = [
    //   {
    //     // fixed: true,
    //     // x: chartInstance.getWidth() / 2,
    //     // y: chartInstance.getHeight() / 2,
    //     // symbolSize: 20,
    //     id: '-1'
    //   },
    //   {
    //     id: '0'
    //   },
    //   {
    //     id: '1'
    //   }
    // ];
    const edges: { source: number; target: number; }[] = [];
    let option = {
      series: [
        {
          roam: true,
          data: data,
          edges: edges,
          type: 'graph',
          layout: 'force',
          animation: false,
          legendHoverLink:true,
          symbol: 'circle',
          symbolSize: 40,
          itemStyle: {
            color: "#e8d8ff", //default color
            normal: {
              color: function(params) {
                console.log(params.data.state);
                return COLOR_MAP[params.data.state as string];
              }
            }
          },
          circular: {
            rotateLabel: true //旋转标签
          },
          force: {
            // initLayout: 'circular',
            gravity: 0.1,
            repulsion: 400,
            edgeLength: 5
          },
          label: {
            show: true
          }
          // edges: edges
        }
      ]
    };
    // setInterval(function () {
    //   data.push({
    //     id: data.length + '',
    //   });
    //   var source = Math.round((data.length - 1) * Math.random());
    //   var target = Math.round((data.length - 1) * Math.random());
    //   if (source !== target) {
    //     edges.push({
    //       source: source,
    //       target: target
    //     });
    //   }
    //   chartInstance.setOption({
    //     series: [
    //       {
    //         roam: true,
    //         data: data,
    //         edges: edges
    //       }
    //     ]
    //   });
    //   // console.log('nodes: ' + data.length);
    //   // console.log('links: ' + data.length);
    // }, 5000);
    chartInstance.setOption(option);
  }, []);

  return (
    <div className="cluster-overview-view" style={{ textAlign: "center" }}>
      <h2 className="title">
        <FormattedMessage id="All of the clusters overview"/>
      </h2>
      <div className="chart"
      ref={chartRef}></div>
    </div>
  );
}

export default connect(mapStateToProps)(ClusterOverviewView);