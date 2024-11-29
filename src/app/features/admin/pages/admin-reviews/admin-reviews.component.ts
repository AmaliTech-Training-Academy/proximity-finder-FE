import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { reviews } from '../../../service-provider/data';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';


@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  imports: [TableModule, CommonModule, RatingModule, FormsModule, AutoCompleteModule],
  templateUrl: './admin-reviews.component.html',
  styleUrl: './admin-reviews.component.sass'
})
export class AdminReviewsComponent {
  reviews = reviews;
  value: number = 4;

}
