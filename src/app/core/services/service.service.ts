import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ServiceResponse } from '../models/IServiceResponse';
import { ServiceCategory } from '../models/IServiceCategory';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  apiUrl = 'http://3.136.48.244:8080/api/v1/services';

  constructor(private http: HttpClient) {}

  getServices(): Observable<ServiceCategory[]> {
    return this.http
      .get<ServiceResponse>(this.apiUrl)
      .pipe(map((response) => response.result));
  }

  createService(serviceCategory: ServiceCategory): Observable<ServiceResponse> {
    const formData = new FormData();
    formData.append('name', serviceCategory.name);
    formData.append('description', serviceCategory.description);
    formData.append('image', serviceCategory.image);

    console.log(formData);

    return this.http.post<ServiceResponse>(this.apiUrl, formData);
  }
}
