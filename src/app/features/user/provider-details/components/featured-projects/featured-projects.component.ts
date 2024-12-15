import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProDetails } from '../../../../service-discovery/models/pro-details';
import { ProviderDataService } from '../../../../service-discovery/services/provider-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [],
  templateUrl: './featured-projects.component.html',
  styleUrl: './featured-projects.component.sass'
})
export class FeaturedProjectsComponent implements OnInit, OnDestroy {
  provider!: ProDetails
  providerSubscription: Subscription | null = null

  constructor(private providerService: ProviderDataService) { }

  ngOnInit() {
    const storedProvider = this.providerService.getSelectedProvider();
  
    if (storedProvider) {
      this.provider = storedProvider
    } else {
      this.providerSubscription = this.providerService.selectedProvider$.subscribe((provider) => {
        if (provider) {
          this.provider = provider
        } else {
          console.error('Provider not found');
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.providerSubscription) {
      this.providerSubscription.unsubscribe()
    }
  }
}
