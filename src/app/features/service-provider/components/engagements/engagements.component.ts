import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { quoteRequests, quoteRequestsOptions } from '../../data';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-engagements',
  standalone: true,
  imports: [ChartModule, DropdownModule, ReactiveFormsModule],
  templateUrl: './engagements.component.html',
  styleUrl: './engagements.component.sass',
})
export class EngagementsComponent implements OnInit {
  basicData = quoteRequests;

  basicOptions = quoteRequestsOptions;

  formGroup!: FormGroup;

  interval = [{ name: 'Quarterly' }, { name: 'Monthly' }, { name: 'Annually' }];

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      selectedInterval: new FormControl(this.interval[0].name),
    });
  }
}
