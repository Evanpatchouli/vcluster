import { AlertColor } from "@mui/material";
import { type } from "os";

type MsgState = {
  state: boolean,
  content: string,
  severity: AlertColor,
  counter: NodeJS.Timeout|null
}

export default MsgState;