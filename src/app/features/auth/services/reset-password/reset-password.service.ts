import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private url = environment.baseUrl
  private http = inject(HttpClient);


  resetPassword(password: string, confirmPassword: string, token: string): Observable<string> {
    return this.http.post<string>(`${this.url}/v1/password/reset-password/${token}`, 
      { password, confirmPassword }, 
      { responseType: 'text' as 'json' } 
    );
  }
  

  

}
