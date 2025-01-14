/** @jsxImportSource react */
import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Payment from '../components/payment/payment';
import { renderWithProviders } from './test-utils';
import { PaymentMethod } from '../types/general-types';
import { toast } from 'react-toastify';

jest.mock('react-toastify');

describe('Payment Component', () => {
  const mockProduct = {
    id: 1,
    name: 'Cola',
    price: 5,
    stock: 10,
    image: 'cola.png',
    salesCount: 0
  };

  const mockSetTimeLeft = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders payment methods', () => {
    renderWithProviders(<Payment setTimeLeft={mockSetTimeLeft} />);

    expect(screen.getByText('💵 Cash')).toBeInTheDocument();
    expect(screen.getByText('💳 Credit Card')).toBeInTheDocument();
  });

  test('handles cash payment method selection', () => {
    const stateWithSelectedProduct = {
      product: {
        selectedProduct: mockProduct,
        products: [mockProduct],
        totalSales: 0
      },
      payment: {
        insertedMoney: 0,
        selectedPaymentMethod: null,
        isProcessingPayment: false,
        isInsertingMoney: false,
        lastInsertedAmount: 0,
        collectedMoney: 0,
        sessionEndTime: null
      },
      machine: {
        isSupplierMode: false,
        energyConsumption: 0,
        components: {
          cooling: false,
          heating: false,
          lights: false,
          robotArm: false
        },
        machineTemperature: 20,
        isNightTime: false
      }
    };

    const { dispatch } = renderWithProviders(<Payment setTimeLeft={mockSetTimeLeft} />, {
      preloadedState: stateWithSelectedProduct
    });

    const cashButton = screen.getByText('💵 Cash');
    fireEvent.click(cashButton);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'payment/selectPaymentMethod',
      payload: PaymentMethod.Cash
    });
  });

  test('shows error when trying to insert money without selecting product', async () => {
    const mockToastError = jest.fn();
    (toast.error as jest.Mock).mockImplementation(mockToastError);

    const stateWithCashMethod = {
      payment: {
        insertedMoney: 0,
        selectedPaymentMethod: PaymentMethod.Cash,
        isProcessingPayment: false,
        isInsertingMoney: false,
        lastInsertedAmount: 0,
        collectedMoney: 0,
        sessionEndTime: null
      },
      product: {
        selectedProduct: null,
        products: [mockProduct],
        totalSales: 0
      },
      machine: {
        isSupplierMode: false,
        energyConsumption: 0,
        components: {
          cooling: false,
          heating: false,
          lights: false,
          robotArm: false
        },
        machineTemperature: 20,
        isNightTime: false
      }
    };

    renderWithProviders(<Payment setTimeLeft={mockSetTimeLeft} />, {
      preloadedState: stateWithCashMethod
    });

    const insertButton = screen.getByText('+1');
    fireEvent.click(insertButton);

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith('Please select a product first');
    });
  });

  test('processes credit card payment', async () => {
    const stateWithSelectedProduct = {
      product: {
        selectedProduct: mockProduct,
        products: [mockProduct],
        totalSales: 0
      },
      payment: {
        insertedMoney: 0,
        selectedPaymentMethod: PaymentMethod.CreditCard,
        isProcessingPayment: false,
        isInsertingMoney: false,
        lastInsertedAmount: 0,
        collectedMoney: 0,
        sessionEndTime: null
      },
      machine: {
        isSupplierMode: false,
        energyConsumption: 0,
        components: {
          cooling: false,
          heating: false,
          lights: false,
          robotArm: false
        },
        machineTemperature: 20,
        isNightTime: false
      }
    };

    const { dispatch } = renderWithProviders(<Payment setTimeLeft={mockSetTimeLeft} />, {
      preloadedState: stateWithSelectedProduct
    });

    const purchaseButton = screen.getByText('✅ Purchase');
    fireEvent.click(purchaseButton);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'payment/setProcessingPayment',
      payload: true
    });
  });
});
