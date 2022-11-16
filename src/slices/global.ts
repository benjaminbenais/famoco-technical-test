import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { Global } from 'types/Global';

export const getGlobalData = createAsyncThunk<Global | null>(
  'assets/get-global-data',
  async () => {
    try {
      const response = await axios.get('https://api.coinlore.net/api/global/');

      if (Array.isArray(response.data)) {
        return response.data[0] as Global;
      }

      return null;
    } catch (error) {
      return null;
    }
  }
);

interface GlobalDataState {
  loading: boolean;
  data: Global | null;
  error: boolean;
}

const initialState = {
  loading: false,
  data: null,
  error: false
} as GlobalDataState;

const globalDataSice = createSlice({
  name: 'global-data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGlobalData.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getGlobalData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getGlobalData.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  }
});

export default globalDataSice.reducer;
