import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBank } from '../models/bank';
import { catchError, Observable, retry } from 'rxjs';
import { BankName } from '../models/bank-name';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';

@Injectable({
  providedIn: 'root',
})
export class UserBankService {
  apiUrl =
    'https://api.proximity-finder.amalitech-dev.net/api/v1/provider-service';
  token!: string;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private errorHandler: ErrorHandlingService
  ) {
    this.token = this.localStorageService.getItem('accessToken') || '';
  }
  getAllBanks(): Observable<BankName[]> {
    return this.http.get<BankName[]>(`${this.apiUrl}/banks`).pipe(
      retry(2),
      catchError((error) => this.errorHandler.handleError(error))
    );
  }
  addBank(bank: IBank): Observable<IBank> {
    return this.http
      .post<IBank>(`${this.apiUrl}/payment-method/new-payment-method`, bank)
      .pipe(
        retry(2),
        catchError((error) => this.errorHandler.handleError(error))
      );
  }
}
