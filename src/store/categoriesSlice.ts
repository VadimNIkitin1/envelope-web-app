import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://swarovskidmitrii.ru/api/v1';
axios.defaults.withCredentials = true;

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (_, { rejectWithValue }) => {
    try {
    } catch (error) {}
  },
);

const slice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    // [fetchCategories.pending]: state => {
    //   state.status = 'loading';
    //   state.error = null;
    // },
    // [fetchCategories.fulfilled]: (state, action) => {
    //   state.status = 'resolved';
    //   state.error = null;
    //   state.categories = action.payload;
    // },
    // [fetchCategories.rejected]: (state, action) => {
    //   state.status = 'rejected';
    //   state.error = action.payload;
    // },
  },
});

export default slice.reducer;
