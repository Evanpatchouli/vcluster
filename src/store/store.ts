import { configureStore, createSelector } from "@reduxjs/toolkit";
import _langReducer from "./lang/lang.reducer";
import _msgReducer from "./msg/msg.reducer";
import _clustersReducer from "./clusters/clusters.reducer";
import _themeReducer from "./theme/theme.reducer";
import _permissionReducer from "./permission/permission.reducer";

const store = configureStore({
  reducer: {
    langReducer: _langReducer,
    msgReducer: _msgReducer,
    clustersReducer: _clustersReducer,
    themeReducer: _themeReducer,
    permissionReducer: _permissionReducer,
  },
});

// 从 store 本身推断 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断类型：{posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const langReducer = _langReducer;
export const msgReducer = _msgReducer;
export const clustersReducer = _clustersReducer;
export const themeReducer = _themeReducer;
export const permissionReducer = _permissionReducer;

export default store;
