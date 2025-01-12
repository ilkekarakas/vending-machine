import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductState } from '../../types/general-types';

const initialState: ProductState = {
  products: [
    {
      id: 1,
      name: 'Water',
      price: 25,
      image: '/vending-machine/images/water.png',
      stock: 5,
      salesCount: 0,
    },
    {
      id: 2,
      name: 'Coke',
      price: 35,
      image: '/vending-machine/images/coke.png',
      stock: 3,
      salesCount: 0,
    },
    {
      id: 3,
      name: 'Soda',
      price: 45,
      image: '/vending-machine/images/soda.png',
      stock: 2,
      salesCount: 0,
    }
  ],
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
        // Refill specific product
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
      return initialState;
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
