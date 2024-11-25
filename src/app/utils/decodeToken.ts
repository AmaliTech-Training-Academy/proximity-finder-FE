import { jwtDecode } from "jwt-decode";
import { User } from "../features/profile-management/models/user";

export function decodeToken(token: string): User {
    try {
        return jwtDecode(token) as User;
    }
    catch(error) {
        console.error('Error decoding token:', error);
        return {} as User;
    }
}

export function initializeUser(localStorageService: { getItem: (key: string) => string | null }) {
    const token = localStorageService.getItem('accessToken') || '';
    const decodedUser = decodeToken(token);
  
    if (decodedUser) {
      return {
        token,
        role: decodedUser.role || [],
        email: decodedUser.sub || ''
      };
    } else {
      console.error('Failed to decode token');
      return {
        token: '',
        role: [],
        email: ''
      };
    }
  }