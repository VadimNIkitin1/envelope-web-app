import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'active',
  initialState: {
    active: 0,
    order_type: '',
    showSplashScreen: false,
    splashScreen: true,
  },
  reducers: {
    toggleTabs(state, action) {
      state.active = action.payload;
    },
    checkOrderType(state, action) {
      state.order_type = action.payload;
    },
    setSplashScreen(state, action) {
      state.splashScreen = action.payload;
    },
  },
});

export const { toggleTabs, checkOrderType, setSplashScreen } = slice.actions;

export default slice.reducer;
