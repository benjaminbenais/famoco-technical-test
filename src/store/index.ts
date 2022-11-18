import { configureStore, combineReducers } from '@reduxjs/toolkit';

import global from 'slices/global';
import currencies from 'slices/currencies';
import currency from 'slices/currency';
import markets from 'slices/markets';

export const rootReducer = combineReducers({
  global,
  currencies,
  currency,
  markets
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
