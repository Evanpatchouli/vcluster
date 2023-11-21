import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import SettingsState from "./settings.state";

type SetPayload = SettingsState;

type SettingsReducer = {
  setSettings: (state: SettingsState, action: PayloadAction<SetPayload>) => SettingsState;
  setSetting: (state: SettingsState, action: PayloadAction<Partial<SetPayload>>) => SettingsState;
  resetSettings: () => SettingsState;
};

const defaultSettings: SettingsState = {
  showConfirmOnKill: true,
};

export const counterSlice = createSlice<SettingsState, SettingsReducer, "settings">({
  name: "settings",
  initialState: {
    ...defaultSettings,
  },
  reducers: {
    setSettings: (state, action) => {
      return action.payload;
    },
    setSetting: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetSettings: () => {
      return {
        ...defaultSettings,
      };
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { setSettings, setSetting, resetSettings } = counterSlice.actions;

export default counterSlice.reducer;
