import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { popularServices, popularServicesOptions } from '../../data';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-popular-services',
  standalone: true,
  imports: [ChartModule, DropdownModule, ReactiveFormsModule],
  templateUrl: './popular-services.component.html',
  styleUrl: './popular-services.component.sass',
})
export class PopularServicesComponent implements OnInit {
  data = popularServices;

  options = popularServicesOptions;

  formGroup!: FormGroup;

  interval = [{ name: 'Quarterly' }, { name: 'Monthly' }, { name: 'Annually' }];

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      selectedInterval: new FormControl(this.interval[0].name),
    });
  }
}
