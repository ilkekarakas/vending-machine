import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../redux/store';
import { VendingMachineContext, VendingMachineState } from '../context/vending-machine-context';

const createTestStore = (preloadedState?: any) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export const defaultMockState: VendingMachineState = {
  products: [
    { id: 1, name: 'Cola', price: 5, stock: 10, image: '', salesCount: 0 },
    { id: 2, name: 'Water', price: 2, stock: 15, image: '', salesCount: 0 }
  ],
  insertedMoney: 0,
  selectedProduct: null,
  selectedPaymentMethod: null,
  collectedMoney: 100,
  totalSales: 150,
  isProcessingPayment: false,
  energyConsumption: 0,
  components: {
    cooling: true,
    heating: false,
    lights: true,
    robotArm: false,
  },
  machineTemperature: 20,
  isNightTime: false,
  isSupplierMode: false
};

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    vendingMachineState = defaultMockState,
    vendingMachineDispatch = jest.fn(),
    ...renderOptions
  } = {}
) => {
  // Mock store dispatch
  const mockDispatch = jest.fn();
  store.dispatch = mockDispatch;

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <VendingMachineContext.Provider value={{ state: vendingMachineState, dispatch: vendingMachineDispatch }}>
          {children}
        </VendingMachineContext.Provider>
      </Provider>
    );
  }

  return {
    store,
    dispatch: mockDispatch,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};
