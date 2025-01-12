# Vending Machine React Application

A modern vending machine application built with React, TypeScript, and Redux.

## Features

- Product Selection & Display
  - Visual display of available products with prices and stock levels
  - Real-time stock monitoring
  - Support for multiple products: Water (25 units), Coke (35 units), and Soda (45 units)

- Payment System
  - Multiple payment methods: Cash and Credit Card
  - Accept money in denominations of 1, 5, 10, and 20 units
  - Automatic change calculation and return
  - Refund functionality for canceled transactions

- Smart Energy Management
  - Real-time energy consumption monitoring
  - Automated temperature control system
  - Energy-efficient lighting control
  - Maximum consumption limit of 5 units/hour

- Supplier Features
  - Secure maintenance mode with password protection
  - Stock management and refill functionality
  - Sales and revenue tracking
  - Money collection system

- Security & Safety
  - Session timeout after 5 minutes of inactivity
  - Tamper protection for money and products
  - Automatic maintenance mode for issues
  - Error handling and user notifications

## Technology Stack

- React 18
- TypeScript
- Redux Toolkit
- SCSS for styling
- Vite

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/           # React components
│   ├── display-panel/   # Display panel component
│   ├── payment/         # Payment handling components
│   └── product-card/    # Product display components
├── redux/               # Redux state management
│   └── slices/         # Redux slices for state
├── styles/             # SCSS styles
└── types/              # TypeScript type definitions
```

## Component Details

### VendingMachine
- Main component that orchestrates the entire application
- Manages product selection and payment flow
- Controls energy consumption and temperature

### Payment
- Handles multiple payment methods
- Manages money insertion and refunds
- Processes transactions

### ProductCard
- Displays individual product information
- Shows stock status and price
- Handles product selection

### DisplayPanel
- Shows machine status and messages
- Displays current temperature
- Shows energy consumption levels

## State Management

The application uses Redux Toolkit for state management with the following slices:

- `machineSlice`: Manages machine state (temperature, energy, components)
- `productSlice`: Handles product inventory and selection
- `paymentSlice`: Manages payment processing and money handling

## Features in Detail

### Temperature Control
- Maintains temperature between 8-12 degrees
- Automatically adjusts based on time of day
- Uses heating/cooling components efficiently

### Night Mode
- Activates between 8 PM and 6 AM
- Reduces energy consumption
- Automatically manages lighting

### Energy Management
- Monitors component energy usage
- Prevents exceeding 5-unit limit
- Optimizes component activation

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
