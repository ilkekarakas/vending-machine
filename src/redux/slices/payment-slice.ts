import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentState, PaymentMethod } from '../../types/general-types';

const initialState: PaymentState = {
  insertedMoney: 0,
  selectedPaymentMethod: null,
  isProcessingPayment: false,
  collectedMoney: 0,
  errorMessage: null,
  isInsertingMoney: false,
  lastInsertedAmount: 0,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    insertMoney: (state, action: PayloadAction<number>) => {
      state.insertedMoney += action.payload;
      state.errorMessage = null;
    },
    refundMoney: (state) => {
      state.insertedMoney = 0;
      state.errorMessage = null;
    },
    selectPaymentMethod: (state, action: PayloadAction<PaymentMethod | null>) => {
      state.selectedPaymentMethod = action.payload;
      state.errorMessage = null;
    },
    setProcessingPayment: (state, action: PayloadAction<boolean>) => {
      state.isProcessingPayment = action.payload;
    },
    collectMoney: (state) => {
      state.collectedMoney = 0;
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
    deductPayment: (state, action: PayloadAction<number>) => {
      if (state.selectedPaymentMethod === PaymentMethod.Cash) {
        state.insertedMoney -= action.payload;
      }
      // Add the payment to collected money
      state.collectedMoney += action.payload;
    },
    setIsInsertingMoney: (state, action: PayloadAction<boolean>) => {
      state.isInsertingMoney = action.payload;
    },
    setLastInsertedAmount: (state, action: PayloadAction<number>) => {
      state.lastInsertedAmount = action.payload;
    },
    resetPayment: () => {
      return initialState;
    },
  },
});

export const {
  insertMoney,
  refundMoney,
  selectPaymentMethod,
  setProcessingPayment,
  collectMoney,
  setErrorMessage,
  deductPayment,
  setIsInsertingMoney,
  setLastInsertedAmount,
  resetPayment,
} = paymentSlice.actions;

export default paymentSlice.reducer;
