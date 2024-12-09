import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProviderResponse } from '../models/provider-response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  constructor(private http: HttpClient) { }

  getPreview(email: string): Observable<ProviderResponse> {
    return this.http.get<ProviderResponse>(`${environment.baseUrl}/v1/preview?userEmail=${email}`);
  }
}
