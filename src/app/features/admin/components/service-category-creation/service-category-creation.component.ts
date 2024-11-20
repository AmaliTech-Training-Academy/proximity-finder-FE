import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ServiceListingComponent } from '../service-listing/service-listing.component';

@Component({
  selector: 'app-service-category-creation',
  standalone: true,
  imports: [ButtonModule, ServiceListingComponent],
  templateUrl: './service-category-creation.component.html',
  styleUrl: './service-category-creation.component.sass',
})
export class ServiceCategoryCreationComponent {}
