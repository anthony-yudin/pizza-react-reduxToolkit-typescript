import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import basket from './slices/basketSlice';
import products from './slices/productsSlice';

export const store = configureStore({
  reducer: {
    filter,
    basket,
    products,
  },
});
