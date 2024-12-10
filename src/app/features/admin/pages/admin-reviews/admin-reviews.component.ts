import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { review } from '../../../reviews-feedback/models/ireview';
import { ReviewService } from '../../../reviews-feedback/services/review.service';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subscription } from 'rxjs';


@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  imports: [TableModule, CommonModule, RatingModule, FormsModule, AutoCompleteModule],
  templateUrl: './admin-reviews.component.html',
  styleUrl: './admin-reviews.component.sass'
})
export class AdminReviewsComponent implements OnInit, OnDestroy {
  value: number = 4;
  reviews: review[] = []
  filteredReviews: review[] = []
  reviewSubscription: Subscription | null = null
  searchTerm: string = ''
  searchSubject = new BehaviorSubject<string>('')

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    this.reviewService.getReviews();

    this.reviewService.reviews$.subscribe((data) => {
      this.reviews = data.result;
      this.filteredReviews = this.reviews;
    });

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.onSearch(term);
    });
  }

  onSearch(term: string) {
    this.searchTerm = term;
    if (term) {
      this.filteredReviews = this.reviews.filter(review =>
        review.userEmail.toLowerCase().includes(term.toLowerCase()) ||
        review.content.toLowerCase().includes(term.toLowerCase())
      );
    } else {
      this.filteredReviews = this.reviews;
    }
  }

  onSearchInputChange(event: any) {
    this.searchSubject.next(event.target.value);
  }

  ngOnDestroy() {
    this.reviewSubscription?.unsubscribe();
  }

}
