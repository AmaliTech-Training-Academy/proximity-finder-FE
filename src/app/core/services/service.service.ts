import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { ServiceResponse } from '../models/IServiceResponse';
import { ServiceCategory } from '../models/IServiceCategory';
import { environment } from '../../../environments/environment';
import {
  ProviderServiceDetails,
  ProviderServiceResponse,
} from '../models/ProviderServiceResponse';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  apiUrl = environment.serviceUrl;
  servicesUrl = '/api/v1/management/services';
  proServicesUrl = '/api/v1/management/provider-services';
  serviceExperienceUrl = '/api/v1/management/service-experiences';
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

  getProviderServices(): Observable<ProviderServiceDetails[]> {
    return this.http
      .get<ProviderServiceResponse>(`${this.apiUrl}${this.proServicesUrl}`)
      .pipe(map((res) => res.result));
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
