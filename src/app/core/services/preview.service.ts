import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { ProviderResponse } from '../models/provider-response';
import { environment } from '../../../environments/environment';
import { IProfile } from '../../features/profile-management/models/profile';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  constructor(private http: HttpClient, private errorHandler: ErrorHandlingService) { }

  getPreview(email: string): Observable<ProviderResponse> {
    return this.http.get<ProviderResponse>(`${environment.baseUrl}/v1/preview?userEmail=${email}`);
  }

  getClientPreview(email: string): Observable<IProfile> {
    const params = { email }
    return this.http.get<IProfile>(`${environment.baseUrl}/auth/info`, {params}).pipe(
            retry(2),
            catchError((error) => this.errorHandler.handleError(error))
          );
  }
}
