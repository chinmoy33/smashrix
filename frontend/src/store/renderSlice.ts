import { createSlice } from '@reduxjs/toolkit';

const renderSlice = createSlice({
  name: 'render',
  initialState: {activeSection : "home" },
  reducers: {
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    }
  },
});

export const { setActiveSection } = renderSlice.actions;
export default renderSlice.reducer;
