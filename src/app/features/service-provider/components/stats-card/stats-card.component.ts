import { Component, Input } from '@angular/core';

interface Stat {
  icon: string;
  name: string;
  number: number;
  percentage: number;
  type: string;
}

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
