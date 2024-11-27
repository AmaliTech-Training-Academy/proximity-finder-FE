import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, catchError, Observable, retry } from 'rxjs';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user';
import { IProfile } from '../models/profile';
import { IPaymentAccount } from '../../../core/models/payment-account';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  token!: string
  email: string | null | undefined = null
   apiUrl = 'http://34.216.212.142:8888/api/v1'

  loggedInUserSubject = new BehaviorSubject<User | null>(null)
  loggedInUser$ = this.loggedInUserSubject.asObservable()

  constructor(private http: HttpClient, private errorHandler: ErrorHandlingService, private localStorageService: LocalStorageService) {
    this.token = this.localStorageService.getItem('accessToken') || ''
    this.decodeToken()
  }

  getClient(): Observable<IProfile> {
    if(!this.email) {
      throw new Error('Email not found')
    }
    const params = new HttpParams().set( 'email', this.email )

    return this.http.get<IProfile>(`${environment.baseUrl}/auth/info`, { params }).pipe(
      retry(2),
      catchError((error) => this.errorHandler.handleError(error)
    ))
  }
  
  updateClient(client: IProfile): Observable<IProfile> {
    if(!this.email) {
      throw new Error('Email not found')
    }
    const params = new HttpParams().set( 'email', this.email )

    return this.http.put<IProfile>(`${environment.baseUrl}/auth/update/info`, client, {params}).pipe(
      retry(2),
      catchError((error) => this.errorHandler.handleError(error))
    )
  }

  getPaymentAccounts(): Observable<IPaymentAccount[]> {

    return this.http.get<IPaymentAccount[]>(`${this.apiUrl}/payment-method`).pipe(
      retry(2),
      catchError(error => this.errorHandler.handleError(error))
    )
  }


  decodeToken(){
    if(this.token) {
      try {
        const decodedToken = jwtDecode(this.token) as User
        this.email = decodedToken.sub
        this.loggedInUserSubject.next(decodedToken)
      }
      catch (error) {
        console.error('Error decoding token:', error)
      }
    } else {
      console.error('Token not found')
    }
  }

  refreshUserData() {
    this.token = this.localStorageService.getItem('accessToken') || '';
    this.decodeToken();
  }
}