/** @jsxImportSource react */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from '../components/product-card/product-card';
import { renderWithProviders } from './test-utils';

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    name: 'Cola',
    price: 5,
    stock: 10,
    image: 'cola.png',
    salesCount: 0
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders product information correctly', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`${mockProduct.price} units`)).toBeInTheDocument();
    expect(screen.getByText(`📦 Stock: ${mockProduct.stock}`)).toBeInTheDocument();
  });

  test('selects product when clicked', () => {
    const initialState = {
      payment: {
        isProcessingPayment: false,
        selectedPaymentMethod: null,
        insertedMoney: 0,
        isInsertingMoney: false,
        lastInsertedAmount: null,
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
      },
      product: {
        selectedProduct: null,
        products: [mockProduct],
        totalSales: 0
      }
    };

    const { dispatch } = renderWithProviders(<ProductCard product={mockProduct} />, {
      preloadedState: initialState
    });

    const productElement = screen.getByText(mockProduct.name).closest('.product-card');
    if (!productElement) throw new Error('Product element not found');
    
    fireEvent.click(productElement);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'product/selectProduct',
      payload: mockProduct
    });
  });

  test('shows out of stock message when stock is 0', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    renderWithProviders(<ProductCard product={outOfStockProduct} />);

    expect(screen.getByText('❌ Out of Stock')).toBeInTheDocument();
  });

  test('highlights selected product', () => {
    const stateWithSelectedProduct = {
      product: {
        selectedProduct: mockProduct,
        products: [mockProduct],
        totalSales: 0
      },
      payment: {
        isProcessingPayment: false,
        selectedPaymentMethod: null,
        insertedMoney: 0,
        isInsertingMoney: false,
        lastInsertedAmount: null,
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

    renderWithProviders(<ProductCard product={mockProduct} />, {
      preloadedState: stateWithSelectedProduct
    });

    const productElement = screen.getByText(mockProduct.name).closest('.product-card');
    if (!productElement) throw new Error('Product element not found');
    
    expect(productElement).toHaveClass('product-card', 'selected');
  });
});
