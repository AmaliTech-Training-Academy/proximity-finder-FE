import { Component, inject, InjectionToken } from '@angular/core';
import { UserProfileHeaderComponent } from "../../../../shared/components/user-profile-header/user-profile-header.component";
import { ProfileDetailsComponent } from "../../provider-details/components/profile-details/profile-details.component";
import { ScheduleOverviewComponent } from "../../provider-details/components/schedule-overview/schedule-overview.component";
import { FeaturedProjectsComponent } from "../../provider-details/components/featured-projects/featured-projects.component";
import { ReviewsComponent } from "../../provider-details/components/reviews/reviews.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CredentialsComponent } from "../../provider-details/components/credentials/credentials.component";
import { PreviewService } from '../../../../core/services/preview.service';
import { FormBuilder } from '@angular/forms';
import { ProviderDataService } from '../../../service-discovery/services/provider-data.service';
import { ProDetails } from '../../../service-discovery/models/pro-details';
import { Subscription } from 'rxjs';
import { NOTYF } from '../../../../shared/notify/notyf.token';

@Component({
  selector: 'app-provider-details',
  standalone: true,
  imports: [UserProfileHeaderComponent, ProfileDetailsComponent, ScheduleOverviewComponent, FeaturedProjectsComponent, ReviewsComponent, FooterComponent, CredentialsComponent],
  templateUrl: './provider-details.component.html',
  styleUrl: './provider-details.component.sass'
})
export class ProviderDetailsComponent {
  provider!: ProDetails;
  private notyf = inject(NOTYF)
  providerSubscription: Subscription | null = null

  constructor(private formBuilder:FormBuilder, private providerService: ProviderDataService, private previewService: PreviewService){}

  ngOnInit() {
    const storedProvider = this.providerService.getSelectedProvider();
  
    if (storedProvider) {
      this.provider = storedProvider;
    } else {
      this.providerSubscription = this.providerService.selectedProvider$.subscribe((provider) => {
        if (provider) {
          this.provider = provider;
        } else {
          this.notyf.error('Provider not found');
        }
      });
    }

    this.previewService.getPreview(this.provider.userEmail).subscribe((preview) => {
      console.log(preview);
    })
  }
}


