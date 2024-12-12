import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ReviewFormComponent } from "../../../reviews-feedback/components/review-form/review-form.component";

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [MatIconModule, RatingModule, FormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.sass'
})
export class FeedbackComponent {
  value: number = 4;
}
