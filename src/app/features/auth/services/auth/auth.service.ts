import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment.development';
import { jwtDecode } from 'jwt-decode'; 
import { LocalStorageService } from '../../../../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.baseUrl;
  private http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService); 

  public accessToken = new BehaviorSubject<string>(this.localStorageService.getItem('accessToken') || '');
  public refreshToken = new BehaviorSubject<string>(this.localStorageService.getItem('refreshToken') || '');
  public userRoles = new BehaviorSubject<string[]>(this.localStorageService.getItem('userRoles') || []);

  private getTokenExpiration(token: string): number {
    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp * 1000; 
    } catch (error) {
      return 0;
    }
  }


  public isTokenExpired(): boolean {
    const token = this.accessToken.value;
    if (!token) return true;
    const expiration = this.getTokenExpiration(token);
    return Date.now() >= expiration;
  }

  public login(email: string, password: string) {
    return this.http.post(`${this.url}/auth/public/sign-in`, { email, password }).pipe(
      tap((res: any) => {
        const { jwtAccessToken, jwtRefreshToken, roles } = res;

        this.localStorageService.setItem('accessToken', jwtAccessToken);
        this.localStorageService.setItem('refreshToken', jwtRefreshToken);
        this.localStorageService.setItem('userRoles', JSON.stringify(roles));

        this.accessToken.next(jwtAccessToken);
        this.refreshToken.next(jwtRefreshToken);
        this.userRoles.next(roles);
      })
    );
  }

  public refreshAccessToken(): Observable<any> {
    return this.http.post(`${this.url}/auth/refresh-token`, {
      refreshToken: this.refreshToken.value
    }).pipe(
      tap((res: any) => {
        const newAccessToken = res.newAccessToken;
        this.localStorageService.setItem('accessToken', newAccessToken);
        this.localStorageService.setItem('newAccessToken', newAccessToken);
        this.accessToken.next(newAccessToken);
      })
    );
  }

  public logout(): void {
    this.accessToken.next('');
    this.refreshToken.next('');
    this.userRoles.next([]);
    
    this.localStorageService.removeItem('accessToken');
    this.localStorageService.removeItem('refreshToken');
    this.localStorageService.removeItem('userRoles');
  }
}