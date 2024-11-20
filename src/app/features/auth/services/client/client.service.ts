import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClient, IRes } from '../../models/client';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url = environment.baseUrl;

  constructor(private http:HttpClient) { }

  signupClient(data:IClient):Observable<IRes>{
    return this.http.post<IRes>(`${this.url}/auth/public/create`,data)
  }
}
