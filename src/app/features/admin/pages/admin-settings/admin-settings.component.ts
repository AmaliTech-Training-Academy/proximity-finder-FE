import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { ServiceListingComponent } from '../../components/service-listing/service-listing.component';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [TabViewModule, ButtonModule, ServiceListingComponent],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.sass',
})
export class AdminSettingsComponent {}
