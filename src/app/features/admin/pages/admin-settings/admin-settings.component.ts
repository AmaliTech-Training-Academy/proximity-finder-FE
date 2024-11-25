import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ServiceListingComponent } from '../../components/service-listing/service-listing.component';
import { ServiceCategoryCreationComponent } from '../../components/service-category-creation/service-category-creation.component';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [
    TabViewModule,
    ServiceCategoryCreationComponent,
    ServiceListingComponent,
  ],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.sass',
})
export class AdminSettingsComponent {}
