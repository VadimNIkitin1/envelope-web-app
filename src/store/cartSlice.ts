import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { ICart, IProduct } from './types';

//@ts-ignore
export const tg_user_id = window.Telegram.WebApp.initDataUnsafe?.user?.id;
const url = window.location.href;

const schema = url.match(/schema=(\d+)/)?.[1];
const store_id = url.match(/store_id=(\d+)/)?.[1];
const QUERY = `?schema=${!schema ? 10 : schema}&store_id=${!store_id ? 1 : store_id}&tg_user_id=${
  !tg_user_id ? 1132630506 : tg_user_id
}`;

axios.defaults.baseURL = 'https://envelope-app.ru/api/v1/store_bot/';
axios.defaults.withCredentials = true;

const initialState: ICart = {
  cart: [],
  total_price: 0,
  render: false,
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
      const res = await axios.get(`cart/${QUERY}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addProduct = createAsyncThunk<IProduct, string | undefined, { rejectValue: string }>(
  'cart/addProduct',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`cart/add/${QUERY}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(trigerRender());
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const decreaseProduct = createAsyncThunk<
  IProduct,
  string | undefined,
  { rejectValue: string }
>('cart/deleteProduct', async (_, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.delete(`cart/decrease/${QUERY}`, {});
    dispatch(trigerRender());
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const clearCart = createAsyncThunk<string, undefined, { rejectValue: string }>(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`cart/clear/${QUERY}`);
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
      const res = await axios.post(`cart/order/${QUERY}`, order);
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
    trigerRender(state) {
      state.render = !state.render;
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
      .addCase(decreaseProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(decreaseProduct.fulfilled, (state) => {
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

export const { trigerRender } = slice.actions;

export default slice.reducer;
