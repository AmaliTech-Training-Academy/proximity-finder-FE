import { Component, OnDestroy, OnInit } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../../reviews-feedback/services/review.service';
import { review } from '../../../reviews-feedback/models/ireview';
import { Subscription } from 'rxjs';
import { PreviewService } from '../../../../core/services/preview.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [RatingModule, FormsModule, CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.sass'
})
export class FeedbackComponent implements OnInit, OnDestroy {
  reviews: review[] = []
  reviewSubscription: Subscription | null = null
  defaultImage = 'assets/images/default-avatar.png'
  currentPage = 0
  reviewsPerPage = 3
  displayedReviews: review[] = []

  constructor(private reviewService: ReviewService, private previewService: PreviewService) {}

  ngOnInit() {
    this.loadReviews()
  }

  loadReviews() {
    this.reviewService.getReviews()

    this.reviewService.reviews$.subscribe((data) => {
      this.reviews = data.result

      this.reviews.forEach((review) => {
        this.previewService.getClientPreview(review.userEmail).subscribe({
          next: (info) => {
            review.authorInfo = info
          }
        })
      })
      this.updateDisplayedReviews()
    })

  }

  updateDisplayedReviews() {
    const start = this.currentPage * this.reviewsPerPage;
    const end = start + this.reviewsPerPage;
    this.displayedReviews = this.reviews.slice(start, end);
  }

  nextPage() {
    if ((this.currentPage + 1) * this.reviewsPerPage < this.reviews.length) {
      this.currentPage++;
      this.updateDisplayedReviews();
    }
  }
  
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateDisplayedReviews();
    }
  }

  ngOnDestroy() {
    if (this.reviewSubscription) {
      this.reviewSubscription.unsubscribe()
    }
  }
}
