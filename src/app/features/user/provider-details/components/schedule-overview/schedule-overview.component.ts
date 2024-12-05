import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ProDetails } from '../../../../service-discovery/models/pro-details';


@Component({
  selector: 'app-schedule-overview',
  standalone: true,
  imports: [],
  templateUrl: './schedule-overview.component.html',
  styleUrl: './schedule-overview.component.sass'
})
export class ScheduleOverviewComponent{
  @Input() provider!: ProDetails;
  

  
}
