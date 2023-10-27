import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { IProducts, IProduct } from './types';
import axios from 'axios';

axios.defaults.baseURL = 'https://swarovskidmitrii.ru/api/v1/';
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json';

const initialState: IProducts = {
  products: [],
  loading: false,
  error: null,
};

export const getProducts = createAsyncThunk<IProduct[], undefined, { rejectValue: string }>(
  'products/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`products/`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductById = createAsyncThunk<IProduct[], number, { rejectValue: string }>(
  'products/getProductById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`products/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk<IProduct, number, { rejectValue: string }>(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`products/?products_id=${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
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
