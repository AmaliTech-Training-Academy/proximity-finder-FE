import { Injectable } from '@angular/core';
import { ProDetails } from '../models/pro-details';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderDataService {
  private providersSubject = new BehaviorSubject<ProDetails[]>([]);
  providers$ = this.providersSubject.asObservable();

  private selectedProviderSubject = new BehaviorSubject<ProDetails | null>(null);
  selectedProvider$ = this.selectedProviderSubject.asObservable();

  setProviders(providers: ProDetails[]): void {
    this.providersSubject.next(providers);
  }

  getProviders(): ProDetails[] {
    return this.providersSubject.getValue();
  }

  setSelectedProvider(provider: ProDetails): void {
    this.selectedProviderSubject.next(provider);
  }

  getSelectedProvider(): ProDetails | null {
    return this.selectedProviderSubject.getValue();
  }

}
