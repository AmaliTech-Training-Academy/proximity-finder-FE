import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { SvgService } from '../../services/svg.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pro-info-card',
  standalone: true,
  imports: [RatingModule, FormsModule, MatIconModule],
  templateUrl: './pro-info-card.component.html',
  styleUrl: './pro-info-card.component.sass'
})
export class ProInfoCardComponent {
  value: number = 3;

  constructor(private svgService: SvgService, private router: Router) { }

  viewProfile() {
    this.router.navigate(['/pro']);
  }
}
