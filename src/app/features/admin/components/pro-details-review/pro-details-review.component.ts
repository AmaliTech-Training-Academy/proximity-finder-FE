import { Component, Input } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { ProgressBarModule } from 'primeng/progressbar';
import { MeterGroupModule } from 'primeng/metergroup';
import { FormsModule } from '@angular/forms';
import { ProviderResponse } from '../../../../core/models/provider-response';

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
}
