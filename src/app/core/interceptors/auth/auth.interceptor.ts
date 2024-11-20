import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { switchMap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './../../../features/auth/services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (req.url.includes('/auth/public/') || req.url.includes('/password/reset-request')||req.url.includes('/password/reset-password')) {
    return next(req);
  }
  if (authService.isTokenExpired()) {
    return authService.refreshAccessToken().pipe(
      switchMap((refreshResponse) => {
        const updatedRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authService.accessToken.value}`
          }
        });
        return next(updatedRequest);
      }),
      catchError((error) => {
        authService.logout();
        return throwError(() => error);
      })
    );
  }
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.accessToken.value}`
    }
  });

  return next(clonedRequest);
};