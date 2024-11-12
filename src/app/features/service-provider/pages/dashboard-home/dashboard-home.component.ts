import { Component } from '@angular/core';
import { StatsCardComponent } from '../../components/stats-card/stats-card.component';
import { AnalyticsComponent } from '../../components/analytics/analytics.component';
import { generalStats } from '../../data';
import { Stat } from '../../../../core/models/IStat';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [StatsCardComponent, AnalyticsComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.sass',
})
export class DashboardHomeComponent {
  generalStats: Stat[] = generalStats;
}
