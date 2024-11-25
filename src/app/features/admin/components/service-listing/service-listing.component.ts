import { Component, OnInit } from '@angular/core';
import { ServiceCardComponent } from '../service-card/service-card.component';
import { ServiceService } from '../../../../core/services/service.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-service-listing',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent, LoaderComponent],
  templateUrl: './service-listing.component.html',
  styleUrl: './service-listing.component.sass',
})
export class ServiceListingComponent {
  serviceCategories$ = this.serviceService.serviceCategories$;

  constructor(private serviceService: ServiceService) {}
}
