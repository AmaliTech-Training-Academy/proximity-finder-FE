import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { earnings, earningsOptions } from '../../data';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { months } from '../../data';

@Component({
  selector: 'app-earnings',
  standalone: true,
  imports: [ChartModule, DropdownModule, ReactiveFormsModule],
  templateUrl: './earnings.component.html',
  styleUrl: './earnings.component.sass',
})
export class EarningsComponent {
  data = earnings;

  options = earningsOptions;

  months = months;

  selectedMonth = new FormControl(months[0].name);
}
