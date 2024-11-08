import { Component, Input } from '@angular/core';
import { Stat } from '../../../../core/models/IStat';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.sass',
})
export class StatsCardComponent {
  @Input() stat!: Stat;
}
