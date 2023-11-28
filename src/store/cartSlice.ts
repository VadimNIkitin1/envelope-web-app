import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { ICart, IProduct } from './types';

//@ts-ignore
const tg_user_id = window.Telegram.WebApp.initDataUnsafe?.user?.id;
const url = window.location.href;

const schema = url.match(/schema=(\d+)/)?.[1];
const store_id = url.match(/store_id=(\d+)/)?.[1];
const QUERY = `?schema=${!schema ? 1 : schema}&store_id=${!store_id ? 1 : store_id}&tg_user_id=${
  !tg_user_id ? 1132630506 : tg_user_id
}`;

axios.defaults.baseURL = 'https://envelope-app.ru/api/v1/store_bot/';
axios.defaults.withCredentials = true;

const initialState: ICart = {
  cart_items: [],
  total_price: 0,
  render: false,
  loading: false,
  error: null,
};

export interface ISubmitForm {
  customer_name: string;
  customer_phone: number | string;
  tg_user_id?: number | string;
  store_id?: number | string;
}

export interface IAddTgUser {
  tg_user_id: number;
  first_name: string;
  last_name: string;
  username: string;
  is_premium: boolean;
}

export const addTgUser = createAsyncThunk<IAddTgUser, IAddTgUser, { rejectValue: string }>(
  `cart/addTgUser`,
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `add_tg_user/?schema=${!schema ? 1 : schema}`,
        {
          store_id: !store_id ? 1 : store_id,
          ...data,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCart = createAsyncThunk<ICart, undefined, { rejectValue: string }>(
  'cart/getCart',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`cart/${QUERY}`, {
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

export const addProduct = createAsyncThunk<IProduct, string | undefined, { rejectValue: string }>(
  'cart/addProduct',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(
        `cart/add/?schema=${!schema ? 1 : schema}`,
        {
          product_id: Number(id),
          tg_user_id: !tg_user_id ? 1132630506 : tg_user_id,
          store_id: !store_id ? 1 : store_id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
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
>('cart/deleteProduct', async (id, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.delete(`cart/decrease/?schema=${!schema ? 1 : schema}`, {
      data: {
        product_id: Number(id),
        tg_user_id: !tg_user_id ? 1132630506 : tg_user_id,
        store_id: !store_id ? 1 : store_id,
      },
    });
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

export const sendOrder = createAsyncThunk<string, ISubmitForm, { rejectValue: string }>(
  'cart/sendOrder ',
  async (order, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `/create_order/?schema=${!schema ? 1 : schema}`,
        {
          ...order,
          tg_user_id: !tg_user_id ? 1132630506 : tg_user_id,
          store_id: !store_id ? 1 : store_id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
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
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart_items = action.payload.cart_items;
        state.total_price = action.payload.total_price;
        state.loading = false;
      })
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(decreaseProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(decreaseProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendOrder.fulfilled, (state) => {
        state.loading = false;
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
