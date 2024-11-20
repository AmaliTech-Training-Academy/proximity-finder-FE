import { Injectable } from '@angular/core';
import { Observable, retry, catchError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class ImageManagementService {

  constructor(private http: HttpClient, private errorHandler: ErrorHandlingService) { }


  uploadProfileImage(image: File | Blob): Observable<File> {
    const formData = new FormData()
    formData.append('image', image)

    return this.http.post<File>(`${environment.baseUrl}/auth/upload`, formData).pipe(
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
