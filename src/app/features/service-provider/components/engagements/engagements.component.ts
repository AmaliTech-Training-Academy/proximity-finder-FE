import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-engagements',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './engagements.component.html',
  styleUrl: './engagements.component.sass',
})
export class EngagementsComponent implements OnInit {
  basicData: any;

  basicOptions: any;

  ngOnInit(): void {
    this.basicData = {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      datasets: [
        {
          label: 'User Engagements',
          data: [100, 200, 250, 150, 150, 225, 75, 125, 125, 200, 175, 75],
          backgroundColor: ['rgba(224, 242, 254, 1)'],
        },
      ],
    };
    this.basicOptions = {
      plugins: {
        legend: {
          display: false,
          labels: {
            color: 'rgba(37, 44, 50, 1)',
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: 'rgba(119, 135, 143, 1)',
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: 'rgba(119, 135, 143, 1)',
          },
          grid: {
            // color: 'none',
            display: false,
            drawBorder: false,
          },
        },
      },
    };
  }
}
