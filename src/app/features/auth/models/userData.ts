export interface IUser{
   email: string;
   password: string;
   jwtAcessToken:string;
   jwtRefreshToken:string;
   roles:Role[]
}

export type Role = 'provider' | 'seeker'|'admin'