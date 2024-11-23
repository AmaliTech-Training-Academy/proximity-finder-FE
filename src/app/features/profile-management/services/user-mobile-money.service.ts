import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';
import { catchError, Observable, retry } from 'rxjs';
import { IMobileMoney } from '../models/mobile-money';

@Injectable({
  providedIn: 'root'
})
export class UserMobileMoneyService {

  apiUrl = 'http://34.216.212.142:8888/api/v1'
  token!: string

  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private errorHandler: ErrorHandlingService) { 
    this.token = this.localStorageService.getItem('token') || ''
  }

  getServiceProviders(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/payment-method/providers/mobile-money-providers`).pipe(
      retry(2),
      catchError(error => this.errorHandler.handleError(error))
    )
  }


  addMobileMoney(momo: IMobileMoney): Observable<IMobileMoney> {

    const headers = {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        }

    return this.http.post<IMobileMoney>(`${this.apiUrl}/payment-method/new-payment-method`, momo, {headers}).pipe(
      retry(2),
      catchError(error => this.errorHandler.handleError(error))
    )
  }
}

