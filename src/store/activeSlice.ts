import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'active',
  initialState: {
    active: 0,
  },
  reducers: {
    toggleTabs(state, action) {
      state.active = action.payload;
    },
  },
});

export const { toggleTabs } = slice.actions;

export default slice.reducer;
