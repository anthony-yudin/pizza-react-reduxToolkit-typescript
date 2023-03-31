import { createSlice } from '@reduxjs/toolkit';

export const filterInitialState = {
  totalPriceBasket: 0,
  totalCountBasket: 0,
  itemsBasket: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState: filterInitialState,
  reducers: {
    addBasket(state, action) {
      const itemBasket = state.itemsBasket.find(item => action.payload.id === item.id);

      if (itemBasket) {
        itemBasket.quantity++;
      } else {
        state.itemsBasket.push({ ...action.payload, quantity: 1 });
      }

      state.totalPriceBasket += Number(action.payload.price);
      state.totalCountBasket++;
    },

    removeBasket(state, action) {
      const itemsBasket = state.itemsBasket;
      const itemBasket = itemsBasket.find(item => action.payload.item.id === item.id);

      if (itemBasket) {
        itemBasket.quantity--;

        if (itemBasket.quantity === 0 || action.payload.removeAll) {
          let index = itemsBasket.findIndex(item => item.id === itemBasket.id);

          if (index !== -1) {
            itemsBasket.splice(index, 1);
          }
        }

        if (action.payload.removeAll) {
          state.totalCountBasket -= itemBasket.quantity + 1;
          state.totalPriceBasket -= Number(itemBasket.price) * (itemBasket.quantity + 1);
        } else {
          state.totalCountBasket--;
          state.totalPriceBasket -= Number(itemBasket.price);
        }
      }
    },
  },
});

export const { addBasket, removeBasket } = basketSlice.actions;
export default basketSlice.reducer;
