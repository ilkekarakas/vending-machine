import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductState } from '../../types/general-types';
import { PRODUCTS } from '../../utils/products';

const initialState: ProductState = {
  products: PRODUCTS,
  selectedProduct: null,
  totalSales: 0,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    selectProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    decreaseStock: (state, action: PayloadAction<number>) => {
      const product = state.products.find(p => p.id === action.payload);
      if (product && product.stock > 0) {
        product.stock -= 1;
        product.salesCount += 1;
      }
    },
    refillStock: (state, action: PayloadAction<{productId: number | null, amount: number}>) => {
      if (action.payload.productId === null) {
        // Refill all products
        state.products.forEach(product => {
          product.stock += action.payload.amount;
        });
      } else {
        const product = state.products.find(p => p.id === action.payload.productId);
        if (product) {
          product.stock += action.payload.amount;
        }
      }
    },
    updateTotalSales: (state, action: PayloadAction<number>) => {
      state.totalSales += action.payload;
    },
    resetProducts: () => {
      return {
        ...initialState,
        products: PRODUCTS
      };
    },
  },
});

export const {
  selectProduct,
  decreaseStock,
  refillStock,
  updateTotalSales,
  resetProducts,
} = productSlice.actions;

export default productSlice.reducer;
