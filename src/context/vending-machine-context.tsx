import React, { createContext, useContext, useReducer } from 'react';
import { VendingMachineState } from '../types/general-types';

const initialState: VendingMachineState = {
  products: [],
  insertedMoney: 0,
  selectedProduct: null,
  selectedPaymentMethod: null,
  collectedMoney: 0,
  totalSales: 0,
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
  isSupplierMode: false,
};

type Action =
  | { type: 'SELECT_PRODUCT'; payload: any }
  | { type: 'SET_PAYMENT_METHOD'; payload: string }
  | { type: 'INSERT_MONEY'; payload: number }
  | { type: 'PROCESS_PAYMENT'; payload: boolean }
  | { type: 'COLLECT_MONEY'; payload: null }
  | { type: 'SET_SUPPLIER_MODE'; payload: boolean }
  | { type: 'REFILL_STOCK'; payload: { productId: number; amount: number } };

const vendingMachineReducer = (state: VendingMachineState, action: Action): VendingMachineState => {
  switch (action.type) {
    case 'SELECT_PRODUCT':
      return { ...state, selectedProduct: action.payload };
    case 'SET_PAYMENT_METHOD':
      return { ...state, selectedPaymentMethod: action.payload };
    case 'INSERT_MONEY':
      return { ...state, insertedMoney: state.insertedMoney + action.payload };
    case 'PROCESS_PAYMENT':
      return { ...state, isProcessingPayment: action.payload };
    case 'COLLECT_MONEY':
      return { ...state, collectedMoney: 0 };
    case 'SET_SUPPLIER_MODE':
      return { ...state, isSupplierMode: action.payload };
    case 'REFILL_STOCK':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.productId
            ? { ...product, stock: product.stock + action.payload.amount }
            : product
        ),
      };
    default:
      return state;
  }
};

const VendingMachineContext = createContext<{
  state: VendingMachineState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

const VendingMachineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(vendingMachineReducer, initialState);

  return (
    <VendingMachineContext.Provider value={{ state, dispatch }}>
      {children}
    </VendingMachineContext.Provider>
  );
};

const useVendingMachine = () => {
  const context = useContext(VendingMachineContext);
  if (!context) {
    throw new Error('useVendingMachine must be used within a VendingMachineProvider');
  }
  return context;
};

export { VendingMachineContext, VendingMachineProvider, useVendingMachine };  export type { VendingMachineState };

