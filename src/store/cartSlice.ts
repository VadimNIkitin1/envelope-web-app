import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { ICart, IProduct, IProducts } from './types';
import axios from 'axios';

axios.defaults.baseURL = 'https://swarovskidmitrii.ru/api/v1/';
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json';

const initialState: ICart = {
  cart: [],
  loading: false,
  error: null,
};

export const getCart = createAsyncThunk<IProduct[], undefined, { rejectValue: string }>(
  'cart/getCart',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`cart-items/`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearCart = createAsyncThunk<string, undefined, { rejectValue: string }>(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`clear-cart/`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCartTotalPrice = createAsyncThunk<string, undefined, { rejectValue: string }>(
  'cart/getCartTotalPrice ',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('get-cart-total-price/');
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendOrder = createAsyncThunk<IProducts, undefined, { rejectValue: string }>(
  'cart/sendOrder ',
  async (order, { rejectWithValue }) => {
    try {
      const res = await axios.post(`orders/create/`, order);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getCartTotalPrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartTotalPrice.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sendOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state) => {
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
