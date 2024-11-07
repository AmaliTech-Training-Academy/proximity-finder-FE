import { Component } from '@angular/core';
import { EngagementsComponent } from '../engagements/engagements.component';
import { PopularServicesComponent } from '../popular-services/popular-services.component';
import { EarningsComponent } from '../earnings/earnings.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [EngagementsComponent, PopularServicesComponent, EarningsComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.sass',
})
export class AnalyticsComponent {}
