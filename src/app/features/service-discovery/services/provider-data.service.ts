import { Injectable } from '@angular/core';
import { ProDetails } from '../models/pro-details';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderDataService {
  private readonly PROVIDERS_STORAGE_KEY = 'providers';
  private readonly SELECTED_PROVIDER_STORAGE_KEY = 'selectedProvider';

  private providersSubject = new BehaviorSubject<ProDetails[]>(this.getStoredProviders());
  providers$ = this.providersSubject.asObservable();

  private selectedProviderSubject = new BehaviorSubject<ProDetails | null>(this.getStoredSelectedProvider());
  selectedProvider$ = this.selectedProviderSubject.asObservable();

  setProviders(providers: ProDetails[]): void {
    this.providersSubject.next(providers);
    sessionStorage.setItem(this.PROVIDERS_STORAGE_KEY, JSON.stringify(providers));
  }

  getProviders(): ProDetails[] {
    return this.providersSubject.getValue();
  }

  setSelectedProvider(provider: ProDetails): void {
    this.selectedProviderSubject.next(provider);
    sessionStorage.setItem(this.SELECTED_PROVIDER_STORAGE_KEY, JSON.stringify(provider));
  }

  getSelectedProvider(): ProDetails | null {
    return this.selectedProviderSubject.getValue();
  }

  private getStoredProviders(): ProDetails[] {
    const storedData = sessionStorage.getItem(this.PROVIDERS_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  }

  private getStoredSelectedProvider(): ProDetails | null {
    const storedData = sessionStorage.getItem(this.SELECTED_PROVIDER_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : null;
  }

  clearData(): void {
    this.providersSubject.next([]);
    this.selectedProviderSubject.next(null);
    sessionStorage.removeItem(this.PROVIDERS_STORAGE_KEY);
    sessionStorage.removeItem(this.SELECTED_PROVIDER_STORAGE_KEY);
  }


}
