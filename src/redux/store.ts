import { configureStore, combineReducers } from '@reduxjs/toolkit';
import machineReducer from './slices/machine-slice';
import productReducer from './slices/product-slice';
import paymentReducer from './slices/payment-slice';
import { loadState, saveState } from '../utils/localStorage';

const persistedState = loadState();

export const rootReducer = combineReducers({
  machine: machineReducer,
  product: productReducer,
  payment: paymentReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

export type RootState = ReturnType<typeof store.getState>;

// Her state değişikliğinde localStorage'a kaydet
store.subscribe(() => {
  saveState(store.getState());
});

export type AppDispatch = typeof store.dispatch;
