import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentState, PaymentMethod } from '../../types/general-types';

const initialState: PaymentState = {
    insertedMoney: 0,
    selectedPaymentMethod: null,
    isProcessingPayment: false,
    isInsertingMoney: false,
    lastInsertedAmount: null,
    collectedMoney: 0,
    sessionEndTime: null,
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        insertMoney: (state, action: PayloadAction<number>) => {
            state.insertedMoney += action.payload;
        },
        refundMoney: (state) => {
            state.insertedMoney = 0;
        },
        selectPaymentMethod: (state, action: PayloadAction<PaymentMethod | null>) => {
            state.selectedPaymentMethod = action.payload;
        },
        setProcessingPayment: (state, action: PayloadAction<boolean>) => {
            state.isProcessingPayment = action.payload;
        },
        collectMoney: (state) => {
            // Add current collected money to total and reset both values
            state.collectedMoney = 0;
            state.insertedMoney = 0;
            return state;
        },
        deductPayment: (state, action: PayloadAction<number>) => {
            if (state.selectedPaymentMethod === PaymentMethod.Cash) {
                if (state.insertedMoney >= action.payload) {
                    state.insertedMoney -= action.payload;
                }
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
        setSessionEndTime: (state, action: PayloadAction<number | null>) => {
            state.sessionEndTime = action.payload;
        },
        resetPayment: () => {
            const newState = initialState;
            return newState;
        },
    },
});

export const {
    insertMoney,
    refundMoney,
    selectPaymentMethod,
    setProcessingPayment,
    collectMoney,
    deductPayment,
    setIsInsertingMoney,
    setLastInsertedAmount,
    setSessionEndTime,
    resetPayment,
} = paymentSlice.actions;

export default paymentSlice.reducer;
