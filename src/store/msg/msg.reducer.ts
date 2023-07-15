import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AlertColor } from '@mui/material';
import MsgState from './msg.state';
import { clearTimeout } from 'timers';

type ShowMsgPayload = { 
  content: string; 
  severity: AlertColor;
  counter: NodeJS.Timeout|null
}

type MsgReducer = {
  showMsg: (state: MsgState, action: PayloadAction<ShowMsgPayload>) => MsgState,
  closeMsg: (state: MsgState, action: PayloadAction) => MsgState
}

export const counterSlice = createSlice<MsgState,MsgReducer,"msg">({
  name: 'msg',
  initialState: {
    state: false,
    content: "",
    severity: "info",
    counter: null
  },
  reducers: {
    showMsg: (state: MsgState, action: PayloadAction<ShowMsgPayload>) => {
      const { payload } = action;
      if (state.counter) {
        window.clearTimeout(state.counter);
      }
      state = {
        state: true,
        content: payload.content,
        severity: payload.severity,
        counter: payload.counter
      }; 
      return state;
    },
    closeMsg: (state: MsgState, action: PayloadAction) => {
      state = {
        ...state,
        state: false,
        counter: null
      };
      return state;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { showMsg, closeMsg } = counterSlice.actions;

export default counterSlice.reducer;