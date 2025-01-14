/** @jsxImportSource react */
import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SupplierPanel from '../components/supplier-panel/supplier-panel';
import { renderWithProviders } from './test-utils';
import { toast } from 'react-toastify';

jest.mock('react-toastify');

describe('SupplierPanel Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders initial state correctly', () => {
    renderWithProviders(<SupplierPanel />);

    expect(screen.getByText('🔐 Enter Supplier Mode')).toBeInTheDocument();
  });

  test('enters supplier mode with correct password', async () => {
    const { dispatch } = renderWithProviders(<SupplierPanel />);

    const supplierButton = screen.getByText('🔐 Enter Supplier Mode');
    fireEvent.click(supplierButton);

    const passwordInput = screen.getByPlaceholderText('Enter password');
    fireEvent.change(passwordInput, { target: { value: 'aselsan' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'machine/toggleSupplierMode',
      payload: undefined
    });
  });

  test('shows error for incorrect password', async () => {
    const mockToastError = jest.fn();
    (toast.error as jest.Mock).mockImplementation(mockToastError);

    renderWithProviders(<SupplierPanel />);

    const supplierButton = screen.getByText('🔐 Enter Supplier Mode');
    fireEvent.click(supplierButton);

    const passwordInput = screen.getByPlaceholderText('Enter password');
    fireEvent.change(passwordInput, { target: { value: 'wrong' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith(expect.stringContaining('Incorrect password'));
    });
  });

  test('collects money when in supplier mode', async () => {
    const stateWithSupplierMode = {
      machine: {
        isSupplierMode: true,
        energyConsumption: 0,
        components: {
          cooling: false,
          heating: false,
          lights: false,
          robotArm: false
        },
        machineTemperature: 20,
        isNightTime: false
      },
      payment: {
        collectedMoney: 100,
        insertedMoney: 0,
        selectedPaymentMethod: null,
        isProcessingPayment: false,
        isInsertingMoney: false,
        lastInsertedAmount: 0,
        sessionEndTime: null
      },
      product: {
        selectedProduct: null,
        products: [],
        totalSales: 0
      }
    };

    const { dispatch } = renderWithProviders(<SupplierPanel />, {
      preloadedState: stateWithSupplierMode
    });

    const collectButton = screen.getByText('💰 Collect Money');
    fireEvent.click(collectButton);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'payment/collectMoney',
      payload: undefined
    });
  });
});
