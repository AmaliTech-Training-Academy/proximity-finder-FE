import { inject } from '@angular/core';
import { AuthService } from './../../../features/auth/services/auth/auth.service';
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
const token= localStorage.getItem('token')?? '';
const refreshToken=localStorage.getItem('refreshToken')??'';

const isRefreshTokenRoute= ''
console.log(req.url)
  const clonedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  })
  return next(clonedReq);


  

};
