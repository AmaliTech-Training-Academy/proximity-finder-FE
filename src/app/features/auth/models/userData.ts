export interface IUser{
   email: string;
   password: string;
   jwtAccessToken:string;
   jwtRefreshToken:string;
   roles:Role[];
   expirationTime: number
}

export type Role = 'provider' | 'seeker'|'admin'