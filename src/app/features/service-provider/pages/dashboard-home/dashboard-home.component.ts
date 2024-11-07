import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { StatsCardComponent } from '../../components/stats-card/stats-card.component';
import { AnalyticsComponent } from '../../components/analytics/analytics.component';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    StatsCardComponent,
    AnalyticsComponent,
  ],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.sass',
})
export class DashboardHomeComponent {
  generalStats = [
    {
      icon: '../../../../../assets/users.svg',
      name: 'Total Users',
      number: 12450,
      percentage: 15.8,
      type: 'increase',
    },
    {
      icon: '../../../../../assets/users.svg',
      name: 'Service Providers',
      number: 10450,
      percentage: 19.9,
      type: 'increase',
    },
    {
      icon: '../../../../../assets/bookings.svg',
      name: 'Completed Bookings',
      number: 9450,
      percentage: 6.5,
      type: 'decrease',
    },
    {
      icon: '../../../../../assets/revenue.svg',
      name: 'Revenue',
      number: 363.95,
      percentage: 36.5,
      type: 'decrease',
    },
  ];
}
