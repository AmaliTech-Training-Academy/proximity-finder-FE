export interface ProviderData {
  userId: number;
  userName: string;
  email: string;
  mobileNumber: string;
  businessOwnerName: string;
  profileImage: string | null;
  placeName: string;
  latitude: number;
  longitude: number;
  role: Role;
  status: string;
}

interface Role {
  roleId: number;
  roleName: string;
}
