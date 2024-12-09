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
  enabled: boolean;
  profileImage: string | null;
  businessAddress: string | null;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
}