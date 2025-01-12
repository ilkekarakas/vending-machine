import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductState } from '../../types/general-types';

const initialState: ProductState = {
  products: [
    {
      id: 1,
      name: 'Water',
      price: 25,
      image: '/vending-machine/src/assets/media/images/water.png',
      stock: 5,
    },
    {
      id: 2,
      name: 'Coke',
      price: 35,
      image: '/vending-machine/src/assets/media/images/coke.png',
      stock: 3,
    },
    {
      id: 3,
      name: 'Soda',
      price: 45,
      image: '/vending-machine/src/assets/media/images/soda.png',
      stock: 2,
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
      }
    },
    refillStock: (state, action: PayloadAction<number>) => {
      state.products.forEach(product => {
        product.stock += action.payload;
      });
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
