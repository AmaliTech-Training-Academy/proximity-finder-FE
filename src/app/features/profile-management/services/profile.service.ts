import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClient } from '../../auth/models/client';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { IProvider } from '../../auth/models/providerData';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {}
  email = localStorage.getItem('email');

  getClient(): Observable<IClient> {
    return this.http.get<IClient>(`${environment.apiUrl}/auth/info?email=${this.email}`)
  }

  getProvider(): Observable<IProvider> {
    return this.http.get<IProvider>(`${environment.apiUrl}/auth/info?email=${this.email}`)
  }
}
