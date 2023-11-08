import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import "./style.css";
import { RootState } from "../../store/store";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { SpotData, SPOT_STATE, COLOR_MAP } from "./model";
import { useNavigate } from "react-router-dom";
import { routeTo } from "../../util/util";

function mapStateToProps(state: RootState) {
  const { clustersReducer } = state;
  return { pkgs: clustersReducer.clusters };
}

function ClusterOverviewView({ pkgs }: { pkgs: VCluster.PkgConfig[] }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const link = useNavigate();

  const [spots, setSpots] = useState<SpotData[]>([]);

  const pkgsSpotized =
    pkgs.map((pkg, idx) => {
      let spot = new SpotData(pkg);
      spot.SymbolSize(50).Draggable(true).State(SPOT_STATE.SLEEP);
      const sizes = [0, 40, 60, 80, 100, 120, 140, 160];
      spot.symbolSize = sizes[pkg.apps.length];
      if (pkg.apps.length > sizes.length) {
        spot.symbolSize = 200;
      }
      return spot;
    }) ?? [];

  useEffect(() => {
    const _spots = pkgsSpotized.map((item) => {
      const after: SpotData = {
        ...item,
        SymbolSize: item.SymbolSize,
        Draggable: item.Draggable,
        State: item.State,
        buildfromPkg: item.buildfromPkg,
      };
      return after;
    });
    setSpots(_spots);
    // setTimeout(() => {
    //   // @ts-ignore
    //   setSpots((prev) => [
    //     ...prev,
    //     {
    //       id: prev.length + 1 + "",
    //       name: prev.length + 1 + "",
    //       State: SPOT_STATE.SLEEP,
    //     },
    //   ]);
    // }, 2000);
  }, [pkgsSpotized]);

  useEffect(() => {
    chartRef.current?.focus();
    let chartInstance = echarts.init(chartRef.current as unknown as HTMLElement);
    chartInstance.on("click", function (params) {
      if (params.componentType === "series") {
        if (params.seriesType === "graph") {
          if (params.dataType === "node") {
            const data: SpotData = params.data as SpotData;
            routeTo(`/cluster/${data.id}`, link);
          }
        }
      }
    });

    const data = spots;
    const edges: { source: number; target: number }[] = [];
    let option = {
      series: [
        {
          roam: true,
          data: data,
          edges: edges,
          type: "graph",
          layout: "force",
          animation: false,
          legendHoverLink: true,
          symbol: "circle",
          symbolSize: 40,
          itemStyle: {
            color: function (params: echarts.DefaultLabelFormatterCallbackParams) {
              let data: SpotData = params.data as unknown as SpotData;
              return COLOR_MAP[data.state as string];
            },
          },
          circular: {
            rotateLabel: true, //旋转标签
          },
          force: {
            // initLayout: 'circular',
            gravity: 0.1,
            repulsion: 400,
            edgeLength: 5,
          },
          label: {
            show: true,
          },
        },
      ],
    };
    // let timer = setInterval(function () {
    //   if (data.length > 1) {
    //     clearTimeout(timer);
    //     return;
    //   }
    //   data.push({
    //     id: data.length + "",
    //     name: data.length + "",
    //   });
    //   var source = Math.round((data.length - 1) * Math.random());
    //   var target = Math.round((data.length - 1) * Math.random());
    //   if (source !== target) {
    //     edges.push({
    //       source: source,
    //       target: target,
    //     });
    //   }
    //   chartInstance.setOption({
    //     series: [
    //       {
    //         roam: true,
    //         data: data,
    //         edges: edges,
    //       },
    //     ],
    //   });
    // console.log('nodes: ' + data.length);
    // console.log('links: ' + data.length);
    // }, 1000);
    chartInstance.setOption(option);
  }, [spots]);

  return (
    <div className="cluster-overview-view" style={{ textAlign: "center" }}>
      <h2 className="title">
        <FormattedMessage id="All of the clusters overview" />
      </h2>
      <div className="chart" ref={chartRef}></div>
    </div>
  );
}

export default connect(mapStateToProps)(ClusterOverviewView);
