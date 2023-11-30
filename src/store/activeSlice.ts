import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'active',
  initialState: {
    active: 0,
    order_type: '',
  },
  reducers: {
    toggleTabs(state, action) {
      state.active = action.payload;
    },
    checkOrderType(state, action) {
      state.order_type = action.payload;
    },
  },
});

export const { toggleTabs, checkOrderType } = slice.actions;

export default slice.reducer;
