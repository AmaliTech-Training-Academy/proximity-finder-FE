import { Component } from '@angular/core';
import { ServiceService } from '../../../../core/services/service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trending-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trending-services.component.html',
  styleUrl: './trending-services.component.sass'
})
export class TrendingServicesComponent {

  constructor (private service: ServiceService) {}

  trendingServices$ = this.service.getServices();
}
