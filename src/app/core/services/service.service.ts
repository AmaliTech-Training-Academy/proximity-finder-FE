import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ServiceResponse } from '../models/IServiceResponse';
import { ServiceCategory } from '../models/IServiceCategory';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  apiUrl = 'http://3.136.48.244:8080';
  servicesUrl = '/api/v1/services';
  proServicesUrl = '/api/v1/provider-services';
  serviceExperienceUrl = '/api/v1/service-experiences';
  servicesSubject = new BehaviorSubject<ServiceCategory[]>([]);
  serviceCategories$ = this.servicesSubject.asObservable();

  providerServiceId: string = '';

  constructor(private http: HttpClient) {
    this.getServices();
  }

  getServices() {
    this.http
      .get<ServiceResponse>(`${this.apiUrl}${this.servicesUrl}`)
      .pipe(map((response) => this.servicesSubject.next(response.result)))
      .subscribe();
  }

  createService(serviceCategory: ServiceCategory): Observable<ServiceResponse> {
    const formData = new FormData();
    formData.append('name', serviceCategory.name);
    formData.append('description', serviceCategory.description);
    formData.append('image', serviceCategory.image);

    return this.http.post<ServiceResponse>(this.servicesUrl, formData);
  }

  updateService(serviceCategory: ServiceCategory): Observable<ServiceResponse> {
    const formData = new FormData();
    formData.append('name', serviceCategory.name);
    formData.append('description', serviceCategory.description);
    formData.append('image', serviceCategory.image);

    return this.http.put<ServiceResponse>(
      `${this.apiUrl}${this.servicesUrl}/${serviceCategory.id}`,
      formData
    );
  }

  deleteService(id: string) {
    this.http
      .delete<ServiceResponse>(`${this.apiUrl}${this.servicesUrl}/${id}`)
      .subscribe(() => this.getServices());
  }

  setServicePreference(servicePreferenceData: FormData) {
    return this.http.post(
      `${this.apiUrl}${this.proServicesUrl}`,
      servicePreferenceData
    );
  }

  createServiceExperience(serviceExperienceData: FormData) {
    return this.http.post(
      `${this.apiUrl}${this.serviceExperienceUrl}`,
      serviceExperienceData
    );
  }

  setProviderServiceId(providerServiceId: string) {
    this.providerServiceId = providerServiceId;
  }
}
