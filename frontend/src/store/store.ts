import { configureStore } from '@reduxjs/toolkit';
import renderReducer from './renderSlice.ts';

export const store = configureStore({
  reducer: {
    render: renderReducer,
  },
});
