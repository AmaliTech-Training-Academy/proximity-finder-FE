import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { popularServices, popularServicesOptions } from '../../data';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { popularSerivcesDataInterval } from '../../data';

@Component({
  selector: 'app-popular-services',
  standalone: true,
  imports: [ChartModule, DropdownModule, ReactiveFormsModule],
  templateUrl: './popular-services.component.html',
  styleUrl: './popular-services.component.sass',
})
export class PopularServicesComponent {
  data = popularServices;

  options = popularServicesOptions;

  interval = popularSerivcesDataInterval;

  selectedInterval = new FormControl(this.interval[0].name);
}
