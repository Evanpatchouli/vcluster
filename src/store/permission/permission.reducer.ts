import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "permission",
  initialState: [] as VCluster.Hint<VCluster.Permission>[],
  reducers: {
    setPermission: (
      state,
      action: PayloadAction<VCluster.Hint<VCluster.Permission>[]>
    ) => {
      const { payload } = action;
      state = [...payload];
      return state;
    },
    pushPermission: (
      state,
      action: PayloadAction<VCluster.Hint<VCluster.Permission>[]>
    ) => {
      const { payload } = action;
      const newStateSet = new Set([...state, ...payload]);
      state = Array.from(newStateSet);
      return state;
    },
    removePermission: (
      state,
      action: PayloadAction<VCluster.Hint<VCluster.Permission>[]>
    ) => {
      const { payload } = action;
      const newStateSet = new Set(state);
      payload.forEach((permission) => {
        newStateSet.delete(permission);
      });
      state = Array.from(newStateSet);
      return state;
    },
    cleanPermission: (state) => {
      state = [];
      return state;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { setPermission, pushPermission, removePermission } =
  counterSlice.actions;

export default counterSlice.reducer;
