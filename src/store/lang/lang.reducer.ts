import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LANG_ACTIONS_TYPES } from './lang.actions';
import { loadLocale } from '../../locale';

export const counterSlice = createSlice({
  name: 'lang',
  initialState: {
    lang: 'en',
    messages: loadLocale('en').messages
  },
  reducers: {
    setLang: (state, action: PayloadAction<string>) => {
      const { type, payload } = action;
      state = {
        ...state,
        lang: loadLocale(payload).locale,
        messages: loadLocale(payload).messages
      };
      return state;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { setLang } = counterSlice.actions;

export default counterSlice.reducer;