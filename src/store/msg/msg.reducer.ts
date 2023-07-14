import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MSG_ACTIONS_TYPES } from './msg.actions';
import { loadLocale } from '../../locale';
import { useAppDispatch } from '../hook';

export const counterSlice = createSlice({
  name: 'msg',
  initialState: {
    state: false,
    content: "",
    severity: "info"
  },
  reducers: {
    showMsg: (state, action: PayloadAction<{content:string;severity:"info"|"success"|"warning"|"error"}>) => {
      const { type, payload } = action;
      console.log(type);
      state = {
        state: true,
        content: payload.content,
        severity: payload.severity
      };
      return state;
    },
    closeMsg: (state, action: PayloadAction) => {
      const { type, payload } = action;
      console.log(type);
      state = {
        ...state,
        state: false
      };
      console.log(state);
      return state;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { showMsg, closeMsg } = counterSlice.actions;

export default counterSlice.reducer;