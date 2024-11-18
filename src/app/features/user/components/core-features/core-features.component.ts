import { Component } from '@angular/core';
import { SvgService } from '../../../../shared/services/svg.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-core-features',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './core-features.component.html',
  styleUrl: './core-features.component.sass'
})
export class CoreFeaturesComponent {
  constructor (private svgService: SvgService) {}
}
