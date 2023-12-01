import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'active',
  initialState: {
    active: 0,
    order_type: '',
    showSplashScreen: false,
  },
  reducers: {
    toggleTabs(state, action) {
      state.active = action.payload;
    },
    checkOrderType(state, action) {
      state.order_type = action.payload;
    },
    showSplashScreen(state, action) {
      state.showSplashScreen = action.payload;
    },
  },
});

export const { toggleTabs, checkOrderType, showSplashScreen } = slice.actions;

export default slice.reducer;
