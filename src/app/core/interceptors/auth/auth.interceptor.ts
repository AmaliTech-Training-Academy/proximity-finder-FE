import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { switchMap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './../../../features/auth/services/auth/auth.service';
import { excludedEndpoints } from '../../../utils/endPoints';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.accessToken.value}`,
    },
  });

  if (excludedEndpoints.some(path => req.url.includes(path))) {
    console.log('hey')
    return next(clonedRequest);
  }


  if (authService.isTokenExpired()) {
    return authService.refreshAccessToken().pipe(
      switchMap((refreshResponse) => {
        const updatedRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authService.accessToken.value}`,
          },
        });
        return next(updatedRequest);
      }),
      catchError((error) => {
        authService.logout();
        return throwError(() => error);
      })
    );
  }
 

  return next(clonedRequest);
};
