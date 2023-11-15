import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { IProducts, IProduct } from './types';

const url = window.location.href;
const schema = url.replace('https://store.envelope-app.ru/', '').replace('/1/', '');
const store_id = url.replace(`https://store.envelope-app.ru/${schema}/`, '').replace('/', '');

axios.defaults.baseURL = 'https://envelope-app.ru/api/v1/store_bot/';
axios.defaults.withCredentials = true;

const initialState: IProducts = {
  products: [],
  product: {
    id: 0,
    category_id: 0,
    category_name: '',
    name: '',
    description: '',
    webp_image_url: '',
    price: 0,
    quantity: 0,
  },
  loading: false,
  error: null,
};

export const getProducts = createAsyncThunk<IProduct[], undefined, { rejectValue: string }>(
  'products/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`product/?schema=${schema}&store_id=${store_id}`);
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
    const res = await axios.get(`product/${id}`);
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
