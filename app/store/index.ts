// import { configureStore } from '@reduxjs/toolkit';
// import layoutReducer from './layoutSlice';

// export const store = configureStore({
//   reducer: {
//     layout: layoutReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import layoutReducer from './layoutSlice';

const store = configureStore({
  reducer: {
    search: searchReducer, //검색 상태 관리
    layout: layoutReducer, //레이아웃 관련 상태 관리
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
