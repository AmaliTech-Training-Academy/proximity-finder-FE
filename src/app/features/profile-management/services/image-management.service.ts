import { Injectable } from '@angular/core';
import { Observable, retry, catchError, BehaviorSubject, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { User } from '../models/user';
import { decodeToken } from '../../../utils/decodeToken';

@Injectable({
  providedIn: 'root'
})
export class ImageManagementService {
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

  uploadProfileImage(image: File | Blob | undefined): Observable<string> {
    if (!image) {
      return throwError(() => new Error('Image is required for upload.'));
    }

    const formData = new FormData();
    formData.append('file', image);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put(`${environment.baseUrl}/auth/public/update-profile-picture`, formData, {
      headers,
      responseType: 'text',
    }).pipe(
      retry(2),
      catchError((error) => this.errorHandler.handleError(error))
    );
}


deleteProfileImage(): Observable<string> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  return this.http.delete<string>(`${environment.baseUrl}/auth/profile-picture`, {
    headers,
    responseType: 'text' as 'json',
  }).pipe(
    retry(2),
    catchError((error) => this.errorHandler.handleError(error))
  );
}

}
