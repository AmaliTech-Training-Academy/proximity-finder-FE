import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private url =environment.baseUrl
  private http = inject(HttpClient);

  resetMail(email: string): Observable<string> {
    return this.http.post(`${this.url}/v1/password/reset-request`, { email }, {
      responseType: 'text' 
    });
  }
}