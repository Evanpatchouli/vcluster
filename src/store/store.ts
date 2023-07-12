import { configureStore } from '@reduxjs/toolkit';
import _langReducer from './lang/lang.reducer';

const store = configureStore({
  reducer: {
    langReducer: _langReducer,
  },
});

// 从 store 本身推断 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断类型：{posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const langReducer = _langReducer;

export default store;