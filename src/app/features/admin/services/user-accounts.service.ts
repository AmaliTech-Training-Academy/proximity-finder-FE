import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { catchError, Observable, retry } from 'rxjs';
import { User, UserResponse } from '../models/user-response';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccountsService {

  constructor(private http: HttpClient, private errorHandler: ErrorHandlingService) { }

  getAllUsers(role: string, currentPage: number, pageSize: number): Observable<UserResponse> {

    const params = new HttpParams()
    .set('role', role)
    .set('_page', currentPage.toString())
    .set('_limit', pageSize.toString());
    return this.http.get<UserResponse>(`${environment.baseUrl}/v1/users`, {params}).pipe(
      retry(2),
      catchError(error => this.errorHandler.handleError(error))
    )
  }

  getUserStatus(userId: number, status: string): Observable<User> {
    return this.http.put<User>(`${environment.baseUrl}/v1/users/${userId}/change-status?status=${status}`, {status})
    .pipe(
      retry(2),
      catchError(error => this.errorHandler.handleError(error))
    )

  }

  sendMessage(message: string): Observable<User> {
    return this.http.post<User>(`${environment.baseUrl}/v1/users`, {message})
    .pipe(
      retry(2),
      catchError(error => this.errorHandler.handleError(error))
    )
  }
}
