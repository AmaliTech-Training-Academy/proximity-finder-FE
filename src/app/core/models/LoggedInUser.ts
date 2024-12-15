export interface LoggedInUser {
  exp: number;
  iat: number;
  id: number;
  iss: string;
  role: string[];
  sub: string;
  username: string;
}
