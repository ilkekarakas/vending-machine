import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentState, PaymentMethod } from '../../types/general-types';
import { saveState } from '../../utils/localStorage';
import { store } from '../store';

interface PaymentState {
    insertedMoney: number;
    selectedPaymentMethod: PaymentMethod | null;
    isProcessingPayment: boolean;
    isInsertingMoney: boolean;
    lastInsertedAmount: number | null;
    collectedMoney: number;
    sessionEndTime: number | null;
    errorMessage: string | null;
}

const initialState: PaymentState = {
    insertedMoney: 0,
    selectedPaymentMethod: null,
    isProcessingPayment: false,
    isInsertingMoney: false,
    lastInsertedAmount: null,
    collectedMoney: 0,
    sessionEndTime: null,
    errorMessage: null,
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
            state.collectedMoney += state.insertedMoney;
            state.insertedMoney = 0;
        },
        setErrorMessage: (state, action: PayloadAction<string | null>) => {
            state.errorMessage = action.payload;
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
    setErrorMessage,
    deductPayment,
    setIsInsertingMoney,
    setLastInsertedAmount,
    setSessionEndTime,
    resetPayment,
} = paymentSlice.actions;

export default paymentSlice.reducer;
