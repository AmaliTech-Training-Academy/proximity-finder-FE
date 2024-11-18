import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SvgService } from '../../../../shared/services/svg.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.sass'
})
export class FeedbackComponent {
  constructor(private svgService: SvgService) {}
}
