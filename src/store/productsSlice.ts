import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { IProducts, IProduct } from './types';

const url = window.location.href;
//@ts-ignore
const tg_user_id = window.Telegram.WebApp.initDataUnsafe?.user?.id;

export const schema = url.match(/schema=(\d+)/)?.[1];
export const store_id = url.match(/store_id=(\d+)/)?.[1];

const QUERY = `?schema=${!schema ? 1 : schema}&store_id=${!store_id ? 1 : store_id}`;

axios.defaults.baseURL = 'https://envelope-app.ru/api/v1/store_bot/';
axios.defaults.withCredentials = true;

const initialState: IProducts = {
  products: [],
  product: {
    id: 0,
    category_id: 0,
    name: '',
    description: '',
    image: '',
    price: 0,
    wt: 0,
    unit: {
      id: 0,
      name: '',
    },
    kilocalories: 0,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
  },
  loading: false,
  error: null,
};

export const getProducts = createAsyncThunk<IProduct[], undefined, { rejectValue: string }>(
  'products/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `product/${QUERY}&tg_user_id=${!tg_user_id ? 1132630506 : tg_user_id}`
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductById = createAsyncThunk<
  IProduct,
  string | undefined,
  { rejectValue: string }
>('products/getProductById', async (id, { rejectWithValue }) => {
  try {
    const res = await axios.get(`product/${id}/${QUERY}`);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

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
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.product = action.payload;
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
