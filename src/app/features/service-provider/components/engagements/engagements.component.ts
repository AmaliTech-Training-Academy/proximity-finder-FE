import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { quoteRequests, quoteRequestsOptions } from '../../data';

@Component({
  selector: 'app-engagements',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './engagements.component.html',
  styleUrl: './engagements.component.sass',
})
export class EngagementsComponent {
  basicData = quoteRequests;

  basicOptions = quoteRequestsOptions;
}
