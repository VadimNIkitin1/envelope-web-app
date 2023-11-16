import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { IProducts, IProduct } from './types';

const url = window.location.href;

const schemaMatch = url.match(/schema=(\d+)/);
const store_idMatch = url.match(/store_id=(\d+)/);
const schema = schemaMatch && schemaMatch[1];
const store_id = store_idMatch && store_idMatch[1];
const QUERY = `?schema=${!schema ? 10 : schema}&store_id=${!store_id ? 1 : store_id}`;

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
    image: '',
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
      const res = await axios.get(`product/${QUERY}`);
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
    const res = await axios.get(`product/${QUERY}/${id}`);
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
