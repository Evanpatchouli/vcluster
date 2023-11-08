import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import "./style.css";
import { RootState } from "../../store/store";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { SpotData, SPOT_STATE, COLOR_MAP } from "./model";
import { useNavigate } from "react-router-dom";
import { msg, routeTo, sleep } from "../../util/util";
import { EChartsType } from "echarts";

function mapStateToProps(state: RootState) {
  const { clustersReducer } = state;
  return { pkgs: clustersReducer.clusters };
}

function ClusterOverviewView({ pkgs }: { pkgs: VCluster.PkgConfig[] }) {
  const link = useNavigate();

  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<EChartsType | null>(null);

  const [spots, setSpots] = useState<SpotData[]>([]);

  function pushSpot() {
    let spot = new SpotData({
      id: Math.random() * 1000 * Date.now().valueOf() + "",
      name: spots.length.toString(),
      desc: "",
      apps: [],
      buildfromPkg: null as any,
    });
    spot.SymbolSize(50).Draggable(true).State(SPOT_STATE.SLEEP);
    setSpots([...spots, spot]);
  }

  const option = {
    series: [
      {
        roam: true,
        data: spots,
        edges: spots.map((item, idx) => {
          return {
            source: idx,
            target: idx === spots.length - 1 ? 0 : idx + 1,
          };
        }),
        type: "graph",
        layout: "force",
        animation: false,
        legendHoverLink: true,
        symbol: "circle",
        symbolSize: 40,
        itemStyle: {
          color: function (
            params: echarts.DefaultLabelFormatterCallbackParams
          ) {
            let data: SpotData = params.data as unknown as SpotData;
            return COLOR_MAP[data.state];
          },
        },
        circular: {
          rotateLabel: true, //旋转标签
        },
        force: {
          // initLayout: "circular",
          gravity: 0.1,
          repulsion: 400,
          edgeLength: 100,
        },
        label: {
          show: true,
        },
      },
    ],
  };

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
    if (!chartInstanceRef.current) {
      chartRef.current?.focus();
      let chartInstance = echarts.init(
        chartRef.current as unknown as HTMLElement
      );
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

      chartInstance.setOption(option);
      chartInstanceRef.current = chartInstance;
    }
  }, []);

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
  }, [pkgs]);

  useEffect(() => {
    chartRef.current?.focus();
    chartInstanceRef.current?.setOption(option);
  }, [option]);

  return (
    <div className="cluster-overview-view" style={{ textAlign: "center" }}>
      <h2
        className="title"
        onClick={() => {
          pushSpot();
        }}
      >
        <FormattedMessage id="All of the clusters overview" />
      </h2>
      <div className="chart" ref={chartRef}></div>
    </div>
  );
}

export default connect(mapStateToProps)(ClusterOverviewView);
