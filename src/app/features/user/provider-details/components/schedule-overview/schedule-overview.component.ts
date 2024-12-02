import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NOTYF } from '../../../../../shared/notify/notyf.token';
import { ProDetails } from '../../../../service-discovery/models/pro-details';
import { ProviderDataService } from '../../../../service-discovery/services/provider-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-schedule-overview',
  standalone: true,
  imports: [],
  templateUrl: './schedule-overview.component.html',
  styleUrl: './schedule-overview.component.sass'
})
export class ScheduleOverviewComponent implements OnInit, OnDestroy{
  provider!: ProDetails;
  private notyf = inject(NOTYF)
  providerSubscription: Subscription | null = null

  constructor(private providerService: ProviderDataService) {}

  ngOnInit() {
    this.providerSubscription = this.providerService.selectedProvider$.subscribe((provider) => {
      if (provider) {
        this.provider = provider;
      } else {
        this.notyf.error('Provider not found');
      }
    })
  }

  ngOnDestroy() {
    this.providerSubscription?.unsubscribe()
  }
}
