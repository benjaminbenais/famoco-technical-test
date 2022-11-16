import { configureStore, combineReducers } from '@reduxjs/toolkit';

import global from 'slices/global';
import coins from 'slices/coins';

export const rootReducer = combineReducers({
  global,
  coins
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
