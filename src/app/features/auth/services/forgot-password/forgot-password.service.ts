import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  private url = environment.baseUrl;
  private http = inject(HttpClient);

 resetMail(email:string){
  return this.http.post(`${this.url}/auth/public/reset-password`,{email})
 }
}
