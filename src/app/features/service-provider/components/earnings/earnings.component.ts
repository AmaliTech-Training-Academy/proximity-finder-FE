import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { earnings, earningsOptions } from '../../data';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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

  formGroup!: FormGroup;

  months = months;

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      selectedMonth: new FormControl(months[0].name),
    });
  }
}
