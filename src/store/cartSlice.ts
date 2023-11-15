import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { ICart, IProduct } from './types';

const url = window.location.href;
console.log(url);
axios.defaults.baseURL = 'https://envelope-app.ru/api/v1/store_bot/';
axios.defaults.withCredentials = true;

const initialState: ICart = {
  cart: [],
  total_price: 0,
  quantity: 0,
  loading: false,
  error: null,
};

export interface ISubmitForm {
  items: IProduct[];
  name: string;
  phone: number;
  user_id: number;
  initDataHash: string | null;
}

export const getCart = createAsyncThunk<IProduct[], undefined, { rejectValue: string }>(
  'cart/getCart',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`cart/`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addProduct = createAsyncThunk<IProduct, string | undefined, { rejectValue: string }>(
  'cart/addProduct',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`products/add-to-cart/`, {
        product_id: id,
      });
      dispatch(incrementQuantity());
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk<
  IProduct,
  string | undefined,
  { rejectValue: string }
>('cart/deleteProduct', async (id, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.delete(`products/?products_id=${id}`);
    dispatch(decrementQuantity());
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

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

export const sendOrder = createAsyncThunk<string, ISubmitForm, { rejectValue: string }>(
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
  reducers: {
    incrementQuantity(state) {
      state.quantity = state.quantity + 1;
    },
    decrementQuantity(state) {
      state.quantity = state.quantity - 1;
    },
  },
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
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
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

export const { incrementQuantity, decrementQuantity } = slice.actions;

export default slice.reducer;
