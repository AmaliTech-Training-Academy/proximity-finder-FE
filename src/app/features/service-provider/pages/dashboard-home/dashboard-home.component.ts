import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { StatsCardComponent } from '../../components/stats-card/stats-card.component';
import { AnalyticsComponent } from '../../components/analytics/analytics.component';
import { generalStats } from '../../data';
import { Stat } from '../../../../core/models/IStat';

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
  generalStats: Stat[] = generalStats;
}
