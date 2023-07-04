import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TFilterInitialState, TSort } from '../../types/filter';
import { TRootState } from '../store';
import { filterInitialState } from '../../constants/constants';

const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      const category = Number(action.payload);

      delete state.title;

      if (category === 0) {
        delete state.category;
      } else {
        state.category = category;
      }
    },
    setSort(state, action: PayloadAction<TSort | undefined>) {
      const { payload } = action;

      if (payload?.order && payload?.sortBy) {
        state.order = payload.order;
        state.sortBy = payload.sortBy;
      }
    },
    setSearch(state, action: PayloadAction<string>) {
      delete state.category;

      if (action.payload === '') {
        delete state.title;
      } else {
        state.title = action.payload;
      }
    },
    setFilters(state, { payload }: PayloadAction<TFilterInitialState>) {
      const { category, sortBy, order, title } = payload;

      if (category) {
        state.category = Number(payload.category);
      } else if (category === 0) {
        delete state.category;
      }

      if (sortBy) {
        state.sortBy = payload.sortBy;
      }

      if (order) {
        state.order = payload.order;
      }

      if (title !== '') {
        state.title = payload.title;
      } else {
        delete state.title;
      }
    },
  },
});

export const selectFilter = (state: TRootState): TFilterInitialState => state.filter;
export const { setCategoryId, setSort, setSearch, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
