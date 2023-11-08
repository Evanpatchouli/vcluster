import { PkgConfig } from "../../model/VCluster";

export enum SPOT_STATE {
  SLEEP = "SLEEP",
  WELL = "WELL",
  BAD = "BAD",
  STOP = "STOP",
}

export enum COLOR_MAP {
  SLEEP = "#e8d8ff",
  WELL = "LawnGreen",
  BAD = "OrangeRed",
  STOP = "DarkGray",
}

export type StatusColorKey = keyof typeof COLOR_MAP;

export class SpotData extends PkgConfig {
  public symbolSize: number = 40;
  public draggable: boolean = true;
  public state: StatusColorKey = SPOT_STATE.SLEEP;
  constructor(pkg: PkgConfig) {
    super();
    this.buildfromPkg(pkg);
  }
  SymbolSize(symbolSize: number) {
    this.symbolSize = symbolSize;
    return this;
  }
  Draggable(draggable: boolean) {
    this.draggable = draggable;
    return this;
  }
  State(state: StatusColorKey) {
    this.state = state;
    return this;
  }
}
