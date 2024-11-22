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