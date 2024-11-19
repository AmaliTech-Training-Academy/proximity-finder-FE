import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPassword } from '../models/password';
import { environment } from '../../../../environments/environment.development';
import { catchError, retry } from 'rxjs';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http: HttpClient, private errorHandler: ErrorHandlingService) {}

  changePassword(body: IPassword) {
    return this.http.post<IPassword>(`${environment.apiUrl}/auth/info`, body).pipe(
      retry(2),
      catchError(error => this.errorHandler.handleError(error))
    )
  }
}
