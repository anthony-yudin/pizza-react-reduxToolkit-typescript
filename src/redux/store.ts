import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import basket from './reducers/basketSlice';
import filter from './reducers/filterSlice';
import products from './reducers/productsSlice';
import storage from 'redux-persist/lib/storage';
import { useDispatch } from 'react-redux';

const reducers = combineReducers({
  filter,
  basket,
  products,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['basket'],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const rootReducer = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof rootReducer.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type TRootState = ReturnType<typeof rootReducer.getState>;
export default rootReducer;

export const persistor = persistStore(rootReducer);
