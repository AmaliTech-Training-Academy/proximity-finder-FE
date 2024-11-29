import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { reviews } from '../../../service-provider/data';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  imports: [TableModule, CommonModule, RatingModule, FormsModule],
  templateUrl: './admin-reviews.component.html',
  styleUrl: './admin-reviews.component.sass'
})
export class AdminReviewsComponent {
  reviews = reviews;
  value: number = 4;

  getRating(review: any): number {
    return review.rating ?? 0; // Return 0 if the rating is undefined or null
  }
}
