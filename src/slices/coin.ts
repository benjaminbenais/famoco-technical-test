import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { Coin } from 'types/Coins';

interface GetCoinPayload {
  id: string;
}

export const getCoin = createAsyncThunk<Coin | null, GetCoinPayload>(
  'assets/get-coin',
  async (payload) => {
    try {
      const response = await axios.get(
        `https://api.coinlore.net/api/ticker/?id=${payload.id}`
      );
      if (Array.isArray(response.data)) {
        return response.data[0] as Coin;
      }
      return null;
    } catch {
      return null;
    }
  }
);

interface CoinState {
  loading: boolean;
  data: Coin | null;
  error: boolean;
}

const initialState = {
  loading: false,
  data: null,
  error: false
} as CoinState;

const coinSlice = createSlice({
  name: 'coin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCoin.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getCoin.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getCoin.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  }
});

export default coinSlice.reducer;
