import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ServiceResponse } from '../models/IServiceResponse';
import { ServiceCategory } from '../models/IServiceCategory';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  apiUrl = 'http://3.136.48.244:8080/api/v1/services';
  servicesSubject = new BehaviorSubject<ServiceCategory[]>([]);
  serviceCategories$ = this.servicesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getServices();
  }

  getServices() {
    this.http
      .get<ServiceResponse>(this.apiUrl)
      .pipe(map((response) => this.servicesSubject.next(response.result)))
      .subscribe();
  }

  createService(serviceCategory: ServiceCategory): Observable<ServiceResponse> {
    const formData = new FormData();
    formData.append('name', serviceCategory.name);
    formData.append('description', serviceCategory.description);
    formData.append('image', serviceCategory.image);

    return this.http.post<ServiceResponse>(this.apiUrl, formData);
  }

  deleteService(id: string) {
    this.http
      .delete<ServiceResponse>(`${this.apiUrl}/${id}`)
      .subscribe(() => this.getServices());
  }
}
