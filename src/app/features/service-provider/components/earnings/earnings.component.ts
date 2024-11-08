import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { earnings, earningsOptions } from '../../data';

@Component({
  selector: 'app-earnings',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './earnings.component.html',
  styleUrl: './earnings.component.sass',
})
export class EarningsComponent {
  data = earnings;

  options = earningsOptions;
}
