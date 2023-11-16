import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { ICategories, ICategory } from './types';

const url = window.location.href;

const schemaMatch = url.match(/schema=(\d+)/);
const store_idMatch = url.match(/store_id=(\d+)/);
const schema = schemaMatch && schemaMatch[1];
const store_id = store_idMatch && store_idMatch[1];
const QUERY = `?schema=${!schema ? 10 : schema}&store_id=${!store_id ? 1 : store_id}`;

axios.defaults.baseURL = 'https://envelope-app.ru/api/v1/store_bot/';
axios.defaults.withCredentials = true;

const initialState: ICategories = {
  categories: [],
  loading: false,
  error: null,
};

export const getCategories = createAsyncThunk<ICategory[], undefined, { rejectValue: string }>(
  'categories/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`category/${QUERY}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const slice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

export default slice.reducer;
