import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/product-slice';
import paymentReducer from './slices/payment-slice';
import machineReducer from './slices/machine-slice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    payment: paymentReducer,
    machine: machineReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
