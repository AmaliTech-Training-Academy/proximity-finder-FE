import { Component, Input } from '@angular/core';
import { ServiceCategory } from '../../../../core/models/IServiceCategory';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.sass',
})
export class ServiceCardComponent {
  @Input() serviceCategory!: ServiceCategory;
}
