import { Injectable } from '@angular/core';
import { ProDetails } from '../models/pro-details';

@Injectable({
  providedIn: 'root'
})
export class ProviderDataService {
  providers: ProDetails[] = []

  constructor() { }

  setProviders(data: ProDetails[]) {
    this.providers = data
  }

  getProviders() {
    return this.providers
  }
}
