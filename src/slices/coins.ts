import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { Coin } from 'types/Coins';

interface GetCoinsPayload {
  start: number;
  limit: number;
}

export const getCoins = createAsyncThunk<Coin[] | null, GetCoinsPayload>(
  'assets/get-coins',
  async (payload) => {
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
  }
);

interface CoinsState {
  loading: boolean;
  data: Coin[] | null;
  error: boolean;
}

const initialState = {
  loading: false,
  data: null,
  error: false
} as CoinsState;

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCoins.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(getCoins.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getCoins.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  }
});

export default coinsSlice.reducer;
