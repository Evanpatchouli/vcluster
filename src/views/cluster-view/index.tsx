import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { FormattedMessage } from "react-intl";
import './style.css';
import { useParams } from "react-router-dom";
import { RootState } from "../../store/store";
import { connect } from "react-redux";
import { COLOR_MAP, SPOT_STATE, SpotData } from "./model";

function mapStateToProps(state: RootState) {
  const { clustersReducer } = state;
  return { pkgs: clustersReducer.clusters };
}

function ClusterView({ pkgs }:{pkgs:VCluster.PkgConfig[]}) {
  const params = useParams<{id:string}>();
  console.log(params) // {id: "2",name:"zora"}
  const {id} = params;

  useEffect(() => {
    chartRef.current?.focus();
    let chartInstance = echarts.init(chartRef.current as unknown as HTMLElement);
    chartInstance.on('click', function(params) {
      if (params.componentType === 'series') {
        if (params.seriesType === 'graph') {
          if (params.dataType === 'node') {
            console.log(params.data)
          }
        }
      }
    });
    let pkg = pkgs.find((pkg)=>pkg.id == id);
    let spots: SpotData[] = [];
    if (pkg) {
      spots = pkg.apps.map((app,idx) => {
        let spot = new SpotData(app);
        spot.SymbolSize(80).Draggable(true).State(SPOT_STATE.SLEEP);
        return spot;
      })
    }
    const data = spots;
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
            color: function(params: echarts.DefaultLabelFormatterCallbackParams) {
              let data: SpotData = params.data as unknown as SpotData;
              return COLOR_MAP[data.state as string];
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
  }, [id]);

  const chartRef = useRef<HTMLDivElement>(null);
  return (
    <div className="cluster-view">
      <h2 className="title">{pkgs.find(pkg=>pkg.id==id)?.name}</h2>
      <div className="chart" ref={chartRef}></div>
    </div>
  )
}

export default connect(mapStateToProps)(ClusterView);