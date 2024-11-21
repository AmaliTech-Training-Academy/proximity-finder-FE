import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../service-provider/components/header/header.component';
import { SidebarComponent } from '../../../service-provider/components/sidebar/sidebar.component';

@Component({
  selector: 'app-admin-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './admin-dashboard-layout.component.html',
  styleUrl: './admin-dashboard-layout.component.sass',
})
export class AdminDashboardLayoutComponent {}
