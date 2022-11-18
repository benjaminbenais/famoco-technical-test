import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { Coin } from 'types/Coins';

interface GetCurrencyPayload {
  id: string;
}

export const getCurrency = createAsyncThunk<Coin | null, GetCurrencyPayload>(
  'assets/get-currency',
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

interface CurrencyState {
  loading: boolean;
  data: Coin | null;
  error: boolean;
}

const initialState = {
  loading: false,
  data: null,
  error: false
} as CurrencyState;

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.data = null;
      state.error = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrency.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getCurrency.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getCurrency.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  }
});

export const { resetState } = currencySlice.actions;
export default currencySlice.reducer;
