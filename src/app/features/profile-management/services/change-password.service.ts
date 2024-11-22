import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPassword } from '../models/password';
import { environment } from '../../../../environments/environment.development';
import { catchError, Observable, retry } from 'rxjs';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';
import { jwtDecode } from 'jwt-decode';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { decodeToken } from '../../../utils/decodeToken';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  token!: string
  email: string | null | undefined = null

  constructor(private http: HttpClient, private errorHandler: ErrorHandlingService, private localStorageService: LocalStorageService) {
    this.initializeUser()
  }

  initializeUser() {
    this.token = this.localStorageService.getItem('accessToken') || ''
    const decodedUser = decodeToken(this.token)
    if(decodedUser) {
      this.email = decodedUser.sub
    }
    else {
      console.error('Failed to decode token')
    }
  }

  
  changePassword(body: IPassword): Observable<IPassword> {
    if(!this.email) {
      throw new Error('Email not found')
    }
    
    const params = new HttpParams().set( 'email', this.email)

    return this.http.put<IPassword>(`${environment.baseUrl}/auth/public/update-password`, body, {params}).pipe(
      retry(2),
      catchError(error => this.errorHandler.handleError(error))
    )
  }
}
