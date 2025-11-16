// FedaPay TypeScript definitions for window object

export interface FedaPayTransaction {
  id: string;
  amount: number;
  currency: string;
  description: string;
}

export interface FedaPayCustomer {
  email: string;
  firstname: string;
  lastname: string;
  phone?: string;
}

export interface FedaPayCheckout {
  on(event: 'success', handler: (transaction: any) => void): void;
  on(event: 'error', handler: (error: any) => void): void;
  on(event: 'cancel', handler: () => void): void;
  open(): void;
  close(): void;
}

export interface FedaPayConfig {
  environment: 'sandbox' | 'live';
  token: string;
}

export interface FedaPayCheckoutOptions {
  transaction: FedaPayTransaction;
  customer: FedaPayCustomer;
}

export interface FedaPayAPI {
  init(config: FedaPayConfig): void;
  checkout(options: FedaPayCheckoutOptions): FedaPayCheckout;
}

declare global {
  interface Window {
    FedaPay?: FedaPayAPI;
  }
}