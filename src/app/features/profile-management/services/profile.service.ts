import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClient } from '../../auth/models/client';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, catchError, Observable, retry } from 'rxjs';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user';
import { decodeToken } from '../../../utils/decodeToken';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  token!: string
  email: string | null | undefined = null

  loggedInUserSubject = new BehaviorSubject<User | null>(null)
  loggedInUser$ = this.loggedInUserSubject.asObservable()

  constructor(private http: HttpClient, private errorHandler: ErrorHandlingService, private localStorageService: LocalStorageService) {
    this.initializeUser()
  }

  initializeUser() {
    this.token = this.localStorageService.getItem('accessToken') || ''
    const decodedUser = decodeToken(this.token)
    if(decodedUser) {
      this.email = decodedUser.sub
      this.loggedInUserSubject.next(decodedUser)
    }
    else {
      console.error('Failed to decode token')
    }
  }

  getClient(): Observable<IClient> {
    if(!this.email) {
      throw new Error('Email not found')
    }
    const params = new HttpParams().set( 'email', this.email )

    return this.http.get<IClient>(`${environment.baseUrl}/auth/info`, { params }).pipe(
      retry(2),
      catchError((error) => this.errorHandler.handleError(error)
    ))
  }
  
  updateClient(client: IClient): Observable<IClient> {
    if(!this.email) {
      throw new Error('Email not found')
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const params = new HttpParams().set( 'email', this.email )

    return this.http.put<IClient>(`${environment.baseUrl}/auth/update/info`, client, {params, headers}).pipe(
      retry(2),
      catchError((error) => this.errorHandler.handleError(error))
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
}