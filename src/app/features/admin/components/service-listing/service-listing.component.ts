import { Component } from '@angular/core';
import { ServiceCardComponent } from '../service-card/service-card.component';

@Component({
  selector: 'app-service-listing',
  standalone: true,
  imports: [ServiceCardComponent],
  templateUrl: './service-listing.component.html',
  styleUrl: './service-listing.component.sass',
})
export class ServiceListingComponent {}
