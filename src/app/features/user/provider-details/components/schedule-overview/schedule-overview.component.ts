import { Component,Input, OnInit } from '@angular/core';
import { ProviderResponse } from '../../../../../core/models/provider-response';
import { CommonModule } from '@angular/common';
import { getBusinessYears } from '../../../../../utils/yearsCalculator';


@Component({
  selector: 'app-schedule-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule-overview.component.html',
  styleUrl: './schedule-overview.component.sass'
})
export class ScheduleOverviewComponent implements OnInit {
  @Input() provider!: ProviderResponse;
  getBusinessYears: string | undefined;

  ngOnInit() {
    this.getInceptionDate()
  }

  getInceptionDate() {
    if(this.provider['business-info'].aboutBusinessResponse.inceptionDate){

      const inceptionDate = this.provider['business-info'].aboutBusinessResponse.inceptionDate
      this.getBusinessYears = getBusinessYears(inceptionDate)
    }
  }

  
}
