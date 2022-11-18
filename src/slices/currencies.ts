import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { Coin } from 'types/Coins';

interface GetCurrenciesPayload {
  start: number;
  limit: number;
}

export const getCurrencies = createAsyncThunk<
  Coin[] | null,
  GetCurrenciesPayload
>('assets/get-currencies', async (payload) => {
  try {
    const response = await axios.get(
      `https://api.coinlore.net/api/tickers/?start=${payload.start}&limit=${payload.limit}`
    );

    if (Array.isArray(response.data?.data)) {
      return response.data.data as Coin[];
    }

    return null;
  } catch {
    return null;
  }
});

interface CurrenciesState {
  loading: boolean;
  data: Coin[] | null;
  error: boolean;
}

const initialState = {
  loading: false,
  data: null,
  error: false
} as CurrenciesState;

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.data = null;
      state.error = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrencies.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(getCurrencies.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getCurrencies.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  }
});

export const { resetState } = currenciesSlice.actions;
export default currenciesSlice.reducer;
