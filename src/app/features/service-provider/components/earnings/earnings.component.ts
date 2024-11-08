import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { earnings, earningsOptions } from '../../data';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

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

  formGroup!: FormGroup;

  months = [
    { name: 'January' },
    { name: 'February' },
    { name: 'March' },
    { name: 'April' },
    { name: 'May' },
    { name: 'June' },
    { name: 'July' },
    { name: 'August' },
    { name: 'September' },
    { name: 'October' },
    { name: 'November' },
    { name: 'December' },
  ];

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      selectedMonth: new FormControl(this.months[0].name),
    });
  }
}
