import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TProductBasket } from '../../types/products';
import { TRootState } from '../store';

interface TBasketInitialState {
  totalPriceBasket: number
  totalCountBasket: number
  productsBasket: TProductBasket[]
}

export const basketInitialState: TBasketInitialState = {
  totalPriceBasket: 0,
  totalCountBasket: 0,
  productsBasket: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState: basketInitialState,
  reducers: {
    addBasket(state, action: PayloadAction<TProductBasket>) {
      const itemBasket = state.productsBasket.find(item => action.payload.id === item.id);

      if (itemBasket) {
        itemBasket.quantity++;
      } else {
        state.productsBasket.push({ ...action.payload, quantity: 1 });
      }

      state.totalPriceBasket += Number(action.payload.price);
      state.totalCountBasket++;
    },

    removeBasket(state, action: PayloadAction<{ id: number; removeAll?: boolean }>) {
      const { productsBasket } = state;
      const itemBasket = productsBasket.find(item => action.payload.id === item.id);

      if (itemBasket) {
        itemBasket.quantity--;

        if (itemBasket.quantity === 0 || action.payload.removeAll) {
          const index = productsBasket.findIndex(item => item.id === itemBasket.id);

          if (index !== -1) {
            productsBasket.splice(index, 1);
          }
        }

        if (action.payload.removeAll) {
          state.totalCountBasket -= ++itemBasket.quantity;
          state.totalPriceBasket -= Number(itemBasket.price) * ++itemBasket.quantity;
        } else {
          state.totalCountBasket--;
          state.totalPriceBasket -= Number(itemBasket.price);
        }
      }
    },
  },
});

export const selectBasket = (state: TRootState): TBasketInitialState => state.basket;
export const selectCurrentProductInBasket = (id : number) => (state: TRootState) => state.basket.productsBasket.find(item => item.id === id);
export const { addBasket, removeBasket } = basketSlice.actions;
export default basketSlice.reducer;
