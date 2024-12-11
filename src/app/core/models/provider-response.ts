import { IPaymentAccount } from './payment-account';

export interface Role {
  roleId: number;
  roleName: string;
}

export interface AuthService {
  userId: number;
  userName: string;
  email: string;
  mobileNumber: string | null;
  businessOwnerName: string | null;
  profileImage: string | null;
  placeName: string | null;
  latitude: number;
  longitude: number;
  role: Role;
  status: string;
}

export interface ProviderService {
  id: string;
  userEmail: string;
  paymentPreference: string;
  placeName: string | null;
  serviceExperience: string | null;
  schedulingPolicy: string;
  bookingDays: [];
  documents: [];
  createdAt: string;
  updatedAt: string;
}



export interface AboutBusinessResponse {
  businessId: number;
  inceptionDate: string;
  socialMediaLinks: string[];
  businessIdentityCard: string;
  businessCertificate: string;
  numberOfEmployees: number;
  businessSummary: string;
}

export interface BusinessInfo {
  aboutBusinessResponse: AboutBusinessResponse;
  paymentMethodResponse: IPaymentAccount;
}

export interface ProviderResponse {
  authservice: AuthService;
  'provider-service': ProviderService[];
  'business-info': BusinessInfo;
}
