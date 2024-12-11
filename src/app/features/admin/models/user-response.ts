export interface UserResponse {
  data: User[];
  pagination: Pagination;
}


export interface User {
  userId: number;
  userName: string;
  email: string;
  mobileNumber: string | null;
  businessOwnerName: string | null;
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  profileImage: string | null;
  placeName: string | null;
  latitude: number;
  longitude: number;
  status: string
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
}