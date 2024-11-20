import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPassword } from '../models/password';
import { environment } from '../../../../environments/environment.development';
import { catchError, Observable, retry } from 'rxjs';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';
import { jwtDecode } from 'jwt-decode';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  token: string
  email: string | null | undefined = null

  constructor(private http: HttpClient, private errorHandler: ErrorHandlingService, private localStorageService: LocalStorageService) {
    this.token = this.localStorageService.getItem('accessToken') || ''
    this.decodeToken()
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

  decodeToken(){
    if(this.token) {
      try {
        const decodedToken = jwtDecode(this.token)
        this.email = decodedToken.sub
      }
      catch (error) {
        console.error('Error decoding token:', error)
      }
    } else {
      console.error('Token not found')
    }
  }
}
