export interface ProviderServiceResponse {
  status: string;
  result: ProviderServiceDetails[];
}

export interface ProviderServiceDetails {
  id: string;
  userEmail: string;
  paymentPreference: string;
  placeName: string;
  schedulingPolicy: string;
  bookingDays: Schedule[];
  documents: Document[];
  service: Service;
  serviceExperience: ServiceExperience;
  createdAt: string;
  updatedAt: string;
}

interface Schedule {
  id: string;
  dayOfWeek: string;
  fromTime: string;
  toTime: string;
}

interface Document {
  id: string;
  fileName: string;
  url: string;
}

interface Service {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
}

interface ServiceExperience {
  id: number;
  projectTitle: string;
  description: string;
  images: string[];
}
