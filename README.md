# 🤖 Smart Vending Machine

A modern, interactive vending machine application built with React, TypeScript, and Redux. This project simulates a real-world vending machine with advanced features like temperature control, energy management, and a supplier mode.

## ✨ Features

- 🎯 Product Selection & Display
- 💳 Multiple Payment Methods (Cash/Credit Card)
- 🔒 Secure Supplier Mode
- 🌡️ Temperature Control System
- ⚡ Energy Management
- 🤖 Automated Robot Arm
- 📊 Sales Tracking
- 🌙 Night Mode Support

## 🛠️ Technologies Used

- React 18
- TypeScript
- Redux Toolkit
- React Testing Library
- Jest
- Vite
- SASS
- Styled Components
- React Toastify

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ilkekarakas/vending-machine.git
cd vending-machine
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🧪 Testing

Run tests:
```bash
npm test
```

Watch mode:
```bash
npm run test:watch
```

Coverage report:
```bash
npm run test:coverage
```

## 🏗️ Build

Create a production build:
```bash
npm run build
```

Preview the build:
```bash
npm run preview
```

## 🎮 Usage

### Customer Mode
- Browse available products
- Select products
- Choose payment method (Cash/Credit Card)
- Complete purchase

### Supplier Mode
- Access with password: "aselsan"
- Collect money
- Refill products
- View sales statistics
- Manage machine settings

## 🧩 Project Structure

```
src/
├── components/         # React components
├── redux/             # Redux store and slices
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── assets/            # Static assets
└── __tests__/         # Test files
```
