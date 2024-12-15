import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBank } from '../models/bank';
import { catchError, Observable, retry } from 'rxjs';
import { BankName } from '../models/bank-name';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserBankService {
  apiUrl = environment.paymentsUrl;

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
    return this.http.post<IBank>(`${this.apiUrl}new-payment-method`, bank).pipe(
      retry(2),
      catchError((error) => this.errorHandler.handleError(error))
    );
  }

  deleteBankAccount(accountId: number) {
    return this.http.delete(`${this.apiUrl}${accountId}`).pipe(
      retry(2),
      catchError((error) => this.errorHandler.handleError(error))
    );
  }
}
