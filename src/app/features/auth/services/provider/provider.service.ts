import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProvider } from '../../models/providerData';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private url = environment.baseUrl;

  constructor(private http:HttpClient) { }

  signupProvider(data:IProvider):Observable<IProvider>{
    return this.http.post<IProvider>(`${this.url}/auth/public/create`,data)
  }

}
