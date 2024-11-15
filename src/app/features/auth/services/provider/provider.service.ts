import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProvider } from '../../models/providerData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  apiUrl:string ='http://16.170.246.127:8080/api/auth/public/create'

  constructor(private http:HttpClient) { }

  signupProvider(data:IProvider):Observable<IProvider>{
    return this.http.post<IProvider>(this.apiUrl,data)
  }

}
