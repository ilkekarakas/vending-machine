export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
  salesCount: number;
}

interface VendingMachineState {
  products: Product[];
  insertedMoney: number;
  selectedProduct: Product | null;
  selectedPaymentMethod: PaymentMethod | null;
  errorMessage: string | null;
  collectedMoney: number;
  totalSales: number;
  isProcessingPayment: boolean;
  energyConsumption: number;
  components: {
    cooling: boolean;
    heating: boolean;
    lights: boolean;
    robotArm: boolean;
  };
  componentEnergy: {
    cooling: number;
    heating: number;
    lights: number;
    robotArm: number;
  };
  machineTemperature: number; // Cihazın iç sıcaklığı
  isNightTime: boolean;
  isSupplierMode: boolean;
}

export enum PaymentMethod {
  Cash = 'cash',
  CreditCard = 'credit_card',
}
/**
 * VendingMachineState'in başlangıç durumu
 */
export const initialState: VendingMachineState = {
  products: [],
  insertedMoney: 0,
  selectedProduct: null,
  selectedPaymentMethod: null,
  errorMessage: null,
  collectedMoney: 0,
  totalSales: 0,
  isProcessingPayment: false,
  energyConsumption: 0,
  components: {
    cooling: false,
    heating: false,
    lights: false,
    robotArm: false,
  },
  componentEnergy: {
    cooling: 2.0,
    heating: 2.0,
    lights: 2.0,
    robotArm: 2.0,
  },
  machineTemperature: 8, // Başlangıç sıcaklığı (4-14 arası güvenli bölge)
  isNightTime: false,
  isSupplierMode: false,
};

export interface MachineState {
  energyConsumption: number;
  components: {
    cooling: boolean;
    heating: boolean;
    lights: boolean;
    robotArm: boolean;
  };
  machineTemperature: number;
  isNightTime: boolean;
  isSupplierMode: boolean;
}

export interface PaymentState {
  insertedMoney: number;
  selectedPaymentMethod: PaymentMethod | null;
  isProcessingPayment: boolean;
  isInsertingMoney: boolean;
  lastInsertedAmount: number | null;
  collectedMoney: number;
  sessionEndTime: number | null;
  errorMessage: string | null;
}

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  totalSales: number;
}
