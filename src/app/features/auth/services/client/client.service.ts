import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClient, IRes } from '../../models/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiUrl:string ='http://16.170.246.127:8080/api/auth/public/create'

  constructor(private http:HttpClient) { }

  signupClient(data:IClient):Observable<IRes>{
    return this.http.post<IRes>(this.apiUrl,data)
  }
}
