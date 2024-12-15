import { Component, OnInit } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../../reviews-feedback/services/review.service';
import { PreviewService } from '../../../../core/services/preview.service';
import { CommonModule } from '@angular/common';
import { reviews } from '../../../service-provider/data';
import { appReview } from '../../../reviews-feedback/models/ireview';
@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [RatingModule, FormsModule, CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.sass'
})
export class FeedbackComponent implements OnInit {
  reviews = reviews
  currentPage = 0
  reviewsPerPage = 3
  displayedReviews: appReview[] = []


  ngOnInit() {
    this.updateDisplayedReviews()
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
}
