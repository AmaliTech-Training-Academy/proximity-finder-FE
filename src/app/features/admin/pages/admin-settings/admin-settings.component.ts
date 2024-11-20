import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [TabViewModule, ButtonModule],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.sass',
})
export class AdminSettingsComponent {}
