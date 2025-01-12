import { configureStore } from '@reduxjs/toolkit';
import machineReducer from './slices/machine-slice';
import productReducer from './slices/product-slice';
import paymentReducer from './slices/payment-slice';
import { loadState, saveState } from '../utils/localStorage';

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    machine: machineReducer,
    product: productReducer,
    payment: paymentReducer,
  },
  preloadedState: persistedState,
});

// Her state değişikliğinde localStorage'a kaydet
store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
