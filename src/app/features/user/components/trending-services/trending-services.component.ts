import { Component } from '@angular/core';
import { ServiceService } from '../../../../core/services/service.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ServiceCategory } from '../../../../core/models/IServiceCategory';

@Component({
  selector: 'app-trending-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trending-services.component.html',
  styleUrl: './trending-services.component.sass'
})
export class TrendingServicesComponent {
  trendingServices$!: Observable<ServiceCategory[]>;

  constructor (private service: ServiceService) {
    this.trendingServices$ = this.service.serviceCategories$;

  }

}
