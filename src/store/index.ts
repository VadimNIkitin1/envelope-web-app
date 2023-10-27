import { configureStore } from '@reduxjs/toolkit';
import activeReducer from './activeSlice';
import categoriesReducer from './categoriesSlice';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    activeTab: activeReducer,
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
