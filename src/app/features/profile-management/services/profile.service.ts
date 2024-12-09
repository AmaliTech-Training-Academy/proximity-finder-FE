import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, catchError, Observable, retry, tap } from 'rxjs';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user';
import { IProfile } from '../models/profile';
import { IPaymentAccount, IPaymentAccountNoId } from '../../../core/models/payment-account';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  token!: string
  email: string | null | undefined = null
   apiUrl = 'https://api.proximity-finder.amalitech-dev.net/api/v1/provider-service'

  loggedInUserSubject = new BehaviorSubject<User | null>(null);
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlingService,
    private localStorageService: LocalStorageService
  ) {
    this.token = this.localStorageService.getItem('accessToken') || '';
    this.decodeToken();

  }

  getClient(): Observable<IProfile> {
    if (!this.email) {
      throw new Error('Email not found');
    }
    const params = new HttpParams().set('email', this.email);

    return this.http
      .get<IProfile>(`${environment.baseUrl}/auth/info`, { params })
      .pipe(
        retry(2),
        catchError((error) => this.errorHandler.handleError(error))
      );
  }

  updateClient(client: IProfile): Observable<IProfile> {
    if (!this.email) {
      throw new Error('Email not found');
    }
    const params = new HttpParams().set('email', this.email);

    return this.http
      .put<IProfile>(`${environment.baseUrl}/auth/update/info`, client, {
        params,
      })
      .pipe(
        retry(2),
        catchError((error) => this.errorHandler.handleError(error))
      );
  }

  getPaymentAccounts(): Observable<IPaymentAccount[]> {
    return this.http
      .get<IPaymentAccount[]>(`${this.apiUrl}/payment-method`)
      .pipe(
        retry(2),
        catchError((error) => this.errorHandler.handleError(error))
      );
  }

  editPaymentAccount(
    paymentAccount: IPaymentAccount,
    accountId: number
  ): Observable<IPaymentAccount> {
    return this.http
      .patch<IPaymentAccount>(
        `${this.apiUrl}/payment-method/id=${accountId}`,
        paymentAccount
      )
      .pipe(
        retry(2),
        catchError((error) => this.errorHandler.handleError(error))
      );
  }

  deletePaymentAccount(accountId: number): Observable<IPaymentAccount> {
    return this.http
      .delete<IPaymentAccount>(`${this.apiUrl}/payment-method/id=${accountId}`)
      .pipe(
        retry(2),
        catchError((error) => this.errorHandler.handleError(error))
      );

  }

  decodeToken() {
    if (this.token) {
      try {
        const decodedToken = jwtDecode(this.token) as User;
        this.email = decodedToken.sub;
        this.loggedInUserSubject.next(decodedToken);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.error('Token not found');
    }
  }

  refreshUserData() {
    this.token = this.localStorageService.getItem('accessToken') || '';
    this.decodeToken();
  }
}
