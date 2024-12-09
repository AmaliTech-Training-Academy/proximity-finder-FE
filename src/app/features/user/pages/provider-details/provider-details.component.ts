import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserProfileHeaderComponent } from "../../../../shared/components/user-profile-header/user-profile-header.component";
import { ProfileDetailsComponent } from "../../provider-details/components/profile-details/profile-details.component";
import { ScheduleOverviewComponent } from "../../provider-details/components/schedule-overview/schedule-overview.component";
import { FeaturedProjectsComponent } from "../../provider-details/components/featured-projects/featured-projects.component";
import { ReviewsComponent } from "../../provider-details/components/reviews/reviews.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CredentialsComponent } from "../../provider-details/components/credentials/credentials.component";
import { PreviewService } from '../../../../core/services/preview.service';
import { ProviderDataService } from '../../../service-discovery/services/provider-data.service';
import { ProDetails } from '../../../service-discovery/models/pro-details';
import { catchError, EMPTY, Observable, Subscription } from 'rxjs';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { ProviderResponse } from '../../../../core/models/provider-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-provider-details',
  standalone: true,
  imports: [UserProfileHeaderComponent, ProfileDetailsComponent, ScheduleOverviewComponent, FeaturedProjectsComponent, ReviewsComponent, FooterComponent, CredentialsComponent,
    CommonModule
  ],
  templateUrl: './provider-details.component.html',
  styleUrl: './provider-details.component.sass'
})
export class ProviderDetailsComponent implements OnInit, OnDestroy {
  provider!: ProDetails;
  private notyf = inject(NOTYF)
  providerSubscription: Subscription | null = null
  providerInfo!: Observable<ProviderResponse>

  constructor(private providerService: ProviderDataService, private previewService: PreviewService){}

  ngOnInit() {
    const storedProvider = this.providerService.getSelectedProvider();
  
    if (storedProvider) {
      this.provider = storedProvider
      this.loadProviderInfo()
    } else {
      this.providerSubscription = this.providerService.selectedProvider$.subscribe((provider) => {
        if (provider) {
          this.provider = provider
          this.loadProviderInfo()
        } else {
          this.notyf.error('Provider not found');
        }
      });
    }
  }

  loadProviderInfo() {
    if (this.provider?.userEmail) {
      this.providerInfo = this.previewService.getPreview(this.provider.userEmail).pipe(
        catchError((error) => {
          console.error('Error fetching provider info:', error);
          this.notyf.error('Failed to load provider info');
          return EMPTY;
        })
      )
    }
  }

  ngOnDestroy(): void {
    if (this.providerSubscription) {
      this.providerSubscription.unsubscribe();
    }
  }
}


