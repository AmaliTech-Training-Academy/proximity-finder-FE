import { Component, OnInit } from '@angular/core';
import { ServiceCardComponent } from '../service-card/service-card.component';
import { ServiceService } from '../../../../core/services/service.service';
import { Observable } from 'rxjs';
import { ServiceCategory } from '../../../../core/models/IServiceCategory';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-listing',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent],
  templateUrl: './service-listing.component.html',
  styleUrl: './service-listing.component.sass',
})
export class ServiceListingComponent implements OnInit {
  serviceCategories$!: Observable<ServiceCategory[]>;

  constructor(private serviceService: ServiceService) {}

  ngOnInit() {
    this.serviceCategories$ = this.serviceService.getServices();
  }
}
