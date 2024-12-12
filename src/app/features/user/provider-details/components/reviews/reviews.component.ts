import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ProgressBarModule } from 'primeng/progressbar';
import { MeterGroupModule } from 'primeng/metergroup';
import { ReviewService } from '../../../../reviews-feedback/services/review.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [RatingModule, FormsModule,ProgressBarModule, MeterGroupModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.sass'
})
export class ReviewsComponent {
  value: number = 4
  values = [
    {value: 75, color: '#4285F4' }
];

constructor(private reviewService: ReviewService) { }

}
