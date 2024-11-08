import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { quoteRequests, quoteRequestsOptions } from '../../data';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { quoteDataInterval } from '../../data';

@Component({
  selector: 'app-engagements',
  standalone: true,
  imports: [ChartModule, DropdownModule, ReactiveFormsModule],
  templateUrl: './engagements.component.html',
  styleUrl: './engagements.component.sass',
})
export class EngagementsComponent {
  basicData = quoteRequests;

  basicOptions = quoteRequestsOptions;

  interval = quoteDataInterval;

  selectedInterval = new FormControl(this.interval[0].name);
}
