export interface paymentPreference {
    paymentPreference: string 
}

export interface Bank{
    bankName:string
}

export interface serviceProviders{
   provider:string
}

export interface PayPalPayment {
    paymentPreference: string;
    firstName: string;
    lastName: string;
    email: string;
  }
  
  export interface BankPayment {
    paymentPreference: string;
    bankName: string;
    accountName: string;
    accountNumber: number;
    accountAlias: string;
  }
  
  export interface MobilePayment {
    paymentPreference: string;
    serviceProvider: string;
    accountName: string;
    phoneNumber: number;
    accountAlias: string;
  }

  export type Payment = PayPalPayment | BankPayment | MobilePayment;

  

