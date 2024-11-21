import { Injectable } from '@angular/core';
import { Observable, retry, catchError, BehaviorSubject, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user';
import { decodeToken } from '../../../utils/decodeToken';

@Injectable({
  providedIn: 'root'
})
export class ImageManagementService {
  // apiUrl = 'https://authservice.ahmedzubairu.xyz/api/auth/public/update-profile-picture'
  token!: string
  email: string | number | boolean  = ''

  loggedInUserSubject = new BehaviorSubject<User | null>(null)
  loggedInUser$ = this.loggedInUserSubject.asObservable()
  
  constructor(private http: HttpClient, private errorHandler: ErrorHandlingService, 
              private localStorageService: LocalStorageService) { 
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

  uploadProfileImage(image: File | Blob | undefined): Observable<File> {
    if (!image) {
      return throwError(() => new Error('Image is required for upload.'));
    }
    
    const formData = new FormData()
    formData.append('file', image || '')

    const params = new HttpParams().set( 'email', this.email )

    return this.http.put<File>(`${environment.baseUrl}/auth/public/update-profile-picture`, formData, {params}).pipe(
      retry(2),
      catchError((error) => this.errorHandler.handleError(error))
    )
  }

  deleteProfileImage(): Observable<File> {
    return this.http.delete<File>(`${environment.baseUrl}/auth/delete`).pipe(
      retry(2),
      catchError((error) => this.errorHandler.handleError(error))
    )
  }
}
