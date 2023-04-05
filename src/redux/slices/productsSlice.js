import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async filterString => {
  return axios
    .get(`https://6332a0d9573c03ab0b4ca71c.mockapi.io/items${filterString ? `?${filterString}` : ''}`)
    .then(res => res.data);
});

export const filterInitialState = {
  statusFetchProducts: 'loading',
  itemsProducts: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState: filterInitialState,
  extraReducers: {
    [fetchProducts.pending]: state => {
      state.statusFetchProducts = 'loading';
      state.itemsProducts = [];
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.statusFetchProducts = 'success';
      state.itemsProducts = action.payload;
    },
    [fetchProducts.rejected]: state => {
      state.statusFetchProducts = 'error';
      state.itemsProducts = [];
    },
  },
});

export const selectProducts = state => state.products;
export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
