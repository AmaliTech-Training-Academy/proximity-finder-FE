import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { Router } from '@angular/router';
import { ProDetails } from '../../../features/service-discovery/models/pro-details';
import { ProviderDataService } from '../../../features/service-discovery/services/provider-data.service';

@Component({
  selector: 'app-pro-info-card',
  standalone: true,
  imports: [RatingModule, FormsModule],
  templateUrl: './pro-info-card.component.html',
  styleUrl: './pro-info-card.component.sass'
})
export class ProInfoCardComponent {
  @Input() provider!: ProDetails;
  value: number = 3;

  constructor(private router: Router, private providerService: ProviderDataService) { }

  viewProfile() {
    this.router.navigate(['/pro']);
    this.providerService.setSelectedProvider(this.provider);
  }
}
