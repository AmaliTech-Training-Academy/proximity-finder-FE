import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SvgService } from '../../../../shared/services/svg.service';

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.sass'
})
export class DiscoverComponent {
  constructor(private svgService: SvgService) {}
}
