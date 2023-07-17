import { PkgConfig } from "../../model/VCluster";

export const SPOT_STATE = {
  SLEEP: "SLEEP",
  WELL: "WELL",
  BAD: "BAD",
  STOP: "STOP",
}

export const COLOR_MAP: {[x:string]:string} = {
  SLEEP: "#e8d8ff",
  WELL: "LawnGreen",
  BAD: "OrangeRed",
  STOP: "DarkGray",
}

export class SpotData extends PkgConfig {
  public symbolSize: number = 40;
  public draggable: boolean = true;
  public state: string = SPOT_STATE.SLEEP;
  constructor (pkg: PkgConfig) {
    super();
    this.buildfromPkg(pkg);
  }
  SymbolSize(symbolSize: number){ this.symbolSize = symbolSize; return this; }
  Draggable(draggable: boolean){ this.draggable = draggable; return this; }
  State(state: string){ this.state = state; return this; }
}