import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TProductList } from '../../types/products';
import { TRootState } from '../store';
import { TStatus } from '../../types/status';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filterString: string) => {
    const { data } = await axios.get<TProductList[]>(`https://6332a0d9573c03ab0b4ca71c.mockapi.io/items?${filterString}`);

    return data;
  });

interface TProductsInitialState {
  itemsProducts: TProductList[] | []
  statusFetchProducts: TStatus
}

export const productsInitialState: TProductsInitialState = {
  statusFetchProducts: TStatus.LOADING,
  itemsProducts: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState: productsInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, state => {
      state.statusFetchProducts = TStatus.LOADING;
      state.itemsProducts = [];
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.statusFetchProducts = TStatus.SUCCESS;
      state.itemsProducts = action.payload;
    });

    builder.addCase(fetchProducts.rejected, state => {
      state.statusFetchProducts = TStatus.ERROR;
      state.itemsProducts = [];
    });
  },
});

export const selectProducts = (state: TRootState): TProductsInitialState => state.products;
export default productsSlice.reducer;
