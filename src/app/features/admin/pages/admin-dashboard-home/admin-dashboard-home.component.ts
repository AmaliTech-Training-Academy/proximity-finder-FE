import { Component } from '@angular/core';
import { AnalyticsComponent } from '../../../service-provider/components/analytics/analytics.component';
import { StatsCardComponent } from '../../../service-provider/components/stats-card/stats-card.component';
import { adminGeneralStats } from '../../../service-provider/data';

@Component({
  selector: 'app-admin-dashboard-home',
  standalone: true,
  imports: [AnalyticsComponent, StatsCardComponent],
  templateUrl: './admin-dashboard-home.component.html',
  styleUrl: './admin-dashboard-home.component.sass',
})
export class AdminDashboardHomeComponent {
  adminGeneralStats = adminGeneralStats;
}
