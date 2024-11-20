import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPassword } from '../models/password';
import { environment } from '../../../../environments/environment.development';
import { catchError, Observable, retry } from 'rxjs';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http: HttpClient, private errorHandler: ErrorHandlingService) {}

  email = 'admin@gmail.com'

  changePassword(body: IPassword): Observable<IPassword> {

    if(!this.email) {
      throw new Error('Email not found')
    }
    
    const params = new HttpParams().set( 'email', this.email)

    return this.http.put<IPassword>(`${environment.apiUrl}/auth/public/update-password`, body, {params}).pipe(
      retry(2),
      catchError(error => this.errorHandler.handleError(error))
    )
  }
}
