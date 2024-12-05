import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SvgService } from '../../../../shared/services/svg.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [MatIconModule, RatingModule, FormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.sass'
})
export class FeedbackComponent {
  value: number = 4;
  constructor(private svgService: SvgService) {}
}
