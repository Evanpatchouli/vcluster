import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import ClusterState from './clusters.state';

type SetPayload = VCluster.PkgConfig[]

type MovePayload = number;

type PushPayload = VCluster.PkgConfig;

type ClustersReducer = {
  setClusters: (state: ClusterState, action: PayloadAction<SetPayload>) => ClusterState,
  moveOne: (state: ClusterState, action: PayloadAction<MovePayload>) => ClusterState,
  pushOne: (state: ClusterState, action: PayloadAction<PushPayload>) => ClusterState,
}

export const counterSlice = createSlice<ClusterState,ClustersReducer,"clusters">({
  name: 'clusters',
  initialState: {
    clusters: []
  },
  reducers: {
    setClusters: (state: ClusterState, action: PayloadAction<SetPayload>)=>{
      state.clusters = action.payload;
      return state;
    },
    moveOne: (state: ClusterState, action: PayloadAction<MovePayload>)=>{
      state.clusters = state.clusters.filter((p,idx) => idx !== action.payload);
      return state;
    },
    pushOne: (state: ClusterState, action: PayloadAction<PushPayload>)=>{
      let clusters = state.clusters;
      clusters.push(action.payload);
      state.clusters = clusters;
      return state;
    }
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { setClusters, moveOne, pushOne } = counterSlice.actions;

export default counterSlice.reducer;