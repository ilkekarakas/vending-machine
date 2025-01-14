/** @jsxImportSource react */
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import VendingMachine from '../components/vending-machine';
import { renderWithProviders } from './test-utils';

describe('VendingMachine Component', () => {
  test('renders all main components', () => {
    renderWithProviders(<VendingMachine />);
    
    // Check for main components
    expect(screen.getByText('Vending Machine')).toBeInTheDocument();
    expect(screen.getByText('Select a product')).toBeInTheDocument();
    expect(screen.getByText(/Balance: 0 units/i)).toBeInTheDocument();
  });

  test('renders initial state correctly', () => {
    renderWithProviders(<VendingMachine />);
    
    // Check for initial products
    const productCards = screen.getAllByText(/Stock:/i);
    expect(productCards.length).toBeGreaterThan(0);
    
    // Check for payment methods
    expect(screen.getByText('💵 Cash')).toBeInTheDocument();
    expect(screen.getByText('💳 Credit Card')).toBeInTheDocument();
  });

  test('renders in customer mode by default', () => {
    renderWithProviders(<VendingMachine />);
    
    expect(screen.getByText('🔐 Enter Supplier Mode')).toBeInTheDocument();
    expect(screen.queryByText('💰 Collect Money')).not.toBeInTheDocument();
  });

  test('displays environment status', () => {
    renderWithProviders(<VendingMachine />);
    
    expect(screen.getByText(/Temperature/i)).toBeInTheDocument();
    expect(screen.getByText(/Energy:/i)).toBeInTheDocument();
  });

  test('displays status bar', () => {
    renderWithProviders(<VendingMachine />);
    
    expect(screen.getByText(/Machine:/i)).toBeInTheDocument();
    expect(screen.getByText(/Energy:/i)).toBeInTheDocument();
  });
});
