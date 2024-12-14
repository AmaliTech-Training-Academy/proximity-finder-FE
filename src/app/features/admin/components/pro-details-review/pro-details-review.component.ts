import { Component, Input } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { ProgressBarModule } from 'primeng/progressbar';
import { MeterGroupModule } from 'primeng/metergroup';
import { FormsModule } from '@angular/forms';
import { ProviderResponse } from '../../../../core/models/provider-response';
import { ReviewService } from '../../../reviews-feedback/services/review.service';
import { PreviewService } from '../../../../core/services/preview.service';
import { review } from '../../../reviews-feedback/models/ireview';

@Component({
  selector: 'app-pro-details-review',
  standalone: true,
  imports: [RatingModule, ProgressBarModule, MeterGroupModule, FormsModule],
  templateUrl: './pro-details-review.component.html',
  styleUrl: './pro-details-review.component.sass'
})
export class ProDetailsReviewComponent {
  value: number = 4
  values = [
    {value: 75, color: '#4285F4' }
];
  @Input() provider!: ProviderResponse
  userEmail: string = ''
  reviews: review[] = []
  displayedReviews: review[] = []
  showAllReviews = false
  defaultImage = 'assets/images/default-avatar.png'

constructor(private reviewService: ReviewService, private previewService:PreviewService) {}

  ngOnInit() {
    this.loadReviewsPerProvider()
  }

  getUserEmail() {
    if(this.provider.authservice.email) {
      this.userEmail = this.provider.authservice.email
    }
  }

  loadReviewsPerProvider() {
    this.getUserEmail()
    this.reviewService.getReviewByProviderEmail(this.userEmail).subscribe({
      next: (reviews) => {
        this.reviews = reviews.result

        this.reviews.forEach((review) => {
          this.previewService.getClientPreview(review.userEmail).subscribe({
            next: (info) => {
              review.authorInfo = info
            }
          })
        })
        this.updateDisplayedReviews()
      }
    })
  }

  updateDisplayedReviews() {
    this.displayedReviews = this.showAllReviews ? this.reviews : this.reviews.slice(0, 2)
  }

  toggleReviews() {
    this.showAllReviews = !this.showAllReviews
    this.updateDisplayedReviews()
  }
}
