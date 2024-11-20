import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClient } from '../../auth/models/client';
import { environment } from '../../../../environments/environment';
import { catchError, Observable, retry } from 'rxjs';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private errorHandler: ErrorHandlingService) {}

  email = 'admin@gmail.com'

  getClient(): Observable<IClient> {
    if(!this.email) {
      throw new Error('Email not found')
    }
    const params = new HttpParams().set( 'email', this.email )

    return this.http.get<IClient>(`${environment.apiUrl}/auth/info`, { params }).pipe(
      retry(2),
      catchError((error) => this.errorHandler.handleError(error)
    ))
  }
  
  updateClient(client: IClient): Observable<IClient> {
    return this.http.patch<IClient>(`${environment.apiUrl}/auth/update-profile`, client).pipe(
      retry(2),
      catchError((error) => this.errorHandler.handleError(error))
    )
  }
}