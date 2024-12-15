import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ProgressBarModule } from 'primeng/progressbar';
import { MeterGroupModule } from 'primeng/metergroup';
import { ReviewService } from '../../../../reviews-feedback/services/review.service';
import { analyticsResult, review } from '../../../../reviews-feedback/models/ireview';
import { ProviderDataService } from '../../../../service-discovery/services/provider-data.service';
import { ProDetails } from '../../../../service-discovery/models/pro-details';
import { Subscription } from 'rxjs';
import { NOTYF } from '../../../../../shared/notify/notyf.token';
import { PreviewService } from '../../../../../core/services/preview.service';
import { CommonModule } from '@angular/common';
import { getBusinessYears } from '../../../../../utils/yearsCalculator';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [RatingModule, FormsModule,ProgressBarModule, MeterGroupModule, CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.sass'
})
export class ReviewsComponent implements OnInit, OnDestroy {
  values = [
    {value: 75, color: '#4285F4' }
  ]
  provider!: ProDetails;
  reviews: review[] = []
  providerSubscription: Subscription | null = null
  private notyf = inject(NOTYF)
  serviceId: string = ''
  defaultImage = 'assets/images/default-avatar.png'
  getTime: string | undefined
  displayedReviews: review[] = []
  showAllReviews = false
  analytics!: analyticsResult
  type: 'provider' | 'service' = 'service'

  constructor(private reviewService: ReviewService, private providerService: ProviderDataService,
    private previewService: PreviewService
  ) { }


  ngOnInit() {
    const storedProvider = this.providerService.getSelectedProvider();
  
    if (storedProvider) {
      this.provider = storedProvider
      this.serviceId = this.provider.id
    } else {
      this.providerSubscription = this.providerService.selectedProvider$.subscribe((provider) => {
        if (provider) {
          this.provider = provider
          this.serviceId = this.provider.id
        } else {
          this.notyf.error('Provider not found');
        }
      });
    }
    this.loadReviewsPerService()
  }

  loadReviewsPerService() {
    this.reviewService.getReviewById(this.serviceId).subscribe({
      next: reviews => {
        this.reviews = reviews.result

        this.reviews.forEach((review) => {
          this.previewService.getClientPreview(review.userEmail).subscribe({
            next: (info) => {
              review.authorInfo = info
            }
          })
        })
        this.updateDisplayedReviews()
        this.fetchAnalytics()
      }
    })
  }

  getInceptionDate() {
      if(this.provider.createdAt){
        const inceptionDate = this.provider.createdAt
        this.getTime = getBusinessYears(inceptionDate)
      }
  }

  updateDisplayedReviews() {
    this.displayedReviews = this.showAllReviews ? this.reviews : this.reviews.slice(0, 3)
  }

  toggleReviews() {
    this.showAllReviews = !this.showAllReviews
    this.updateDisplayedReviews()
  }

  fetchAnalytics() {
    this.reviewService.getAnalytics(this.type, this.serviceId).subscribe({
      next: analytics => {
        this.analytics = analytics.result
      },
      error: () => {
        console.error('Failed to fetch review analytics')
      }
    })
  }

  ngOnDestroy() {
    if(this.providerSubscription) {
      this.providerSubscription.unsubscribe()
    }
  }

}
