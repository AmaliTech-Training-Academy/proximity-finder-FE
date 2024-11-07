import { Component } from '@angular/core';
import { EngagementsComponent } from '../engagements/engagements.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [EngagementsComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.sass',
})
export class AnalyticsComponent {}
