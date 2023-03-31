import { createSlice } from '@reduxjs/toolkit';

export const filterInitialState = {
  category: 0,
  searchInputValueRequest: '',
  sort: {
    title: 'Сначала недорогие',
    property: 'priceDefault',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    setCategoryId(state, action) {
      state.category = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setSearch(state, action) {
      state.searchInputValueRequest = action.payload;
    },
    setFilters(state, action) {
      const actionPayload = action.payload;

      if (actionPayload.category) {
        state.category = Number(actionPayload.category);
      }

      if (actionPayload.title) {
        state.searchInputValueRequest = actionPayload.title;
      }

      if (actionPayload.sortBy) {
        state.sort = actionPayload.sortBy;
      }
    },
    setClearFilters(state) {
      state.category = 0;
      state.searchInputValueRequest = '';
      state.sort = {
        title: 'Сначала недорогие',
        property: 'priceDefault',
      };
    },
  },
});

export const { setCategoryId, setSort, setSearch, setFilters, setClearFilters } = filterSlice.actions;
export default filterSlice.reducer;
