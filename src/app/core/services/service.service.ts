import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../models/IServiceResponse';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  apiUrl = 'http://3.136.48.244:8080/api/v1/services';

  constructor(private http: HttpClient) {}

  getServices(): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(this.apiUrl);
  }
}
