import { ServiceCategory } from './IServiceCategory';
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
  serviceExperience: ServiceExperience;
  schedulingPolicy: string;
  service: ServiceCategory
  bookingDays: BookingDays[];
  documents: Documents[];
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
  paymentMethodResponses: IPaymentAccount[];
}

export interface ProviderResponse {
  authservice: AuthService;
  'provider-service': ProviderService[];
  'business-info': BusinessInfo;
}

export interface BookingDays {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

export interface Documents {
  id: string;
  name: string;
  url: string;
}

export interface ServiceExperience {
  id: string;
  description: string;
  projectTitle: string;
  images: string[]
}