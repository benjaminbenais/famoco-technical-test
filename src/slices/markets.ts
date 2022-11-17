import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { Market } from 'types/Markets';

interface GetMarketsPayload {
  id: string;
}

export const getMarkets = createAsyncThunk<Market[] | null, GetMarketsPayload>(
  'markets/get-markets',
  async (payload) => {
    try {
      const response = await axios.get(
        ` https://api.coinlore.net/api/coin/markets/?id=${payload.id}`
      );
      if (Array.isArray(response.data)) {
        return response.data as Market[];
      }
      return null;
    } catch {
      return null;
    }
  }
);

interface MarketsState {
  loading: boolean;
  data: Market[] | null;
  error: boolean;
}

const initialState = {
  loading: false,
  data: null,
  error: false
} as MarketsState;

const marketsSlice = createSlice({
  name: 'markets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMarkets.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getMarkets.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getMarkets.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  }
});

export default marketsSlice.reducer;
