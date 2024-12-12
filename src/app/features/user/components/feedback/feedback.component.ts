import { Component, OnDestroy, OnInit } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../../reviews-feedback/services/review.service';
import { review } from '../../../reviews-feedback/models/ireview';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [ RatingModule, FormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.sass'
})
export class FeedbackComponent implements OnInit, OnDestroy {
  value: number = 4
  reviews: review[] = []
  reviewSubscription: Subscription | null = null

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    this.loadReviews()
  }

  loadReviews() {
    this.reviewService.getReviews()

    this.reviewService.reviews$.subscribe((data) => {
      this.reviews = data.result
    })
  }

  ngOnDestroy() {
    if (this.reviewSubscription) {
      this.reviewSubscription.unsubscribe()
    }
  }
}
