import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { popularServices, popularServicesOptions } from '../../data';

@Component({
  selector: 'app-popular-services',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './popular-services.component.html',
  styleUrl: './popular-services.component.sass',
})
export class PopularServicesComponent {
  data = popularServices;

  options = popularServicesOptions;
}
