import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-popular-services',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './popular-services.component.html',
  styleUrl: './popular-services.component.sass',
})
export class PopularServicesComponent {
  data: any = {
    labels: ['Painting', 'Appliance Fixing', 'Plumbing', 'Cleaning'],
    datasets: [
      {
        data: [300, 50, 100, 200],
        backgroundColor: [
          'rgba(64, 142, 253, 0.8)',
          'rgba(148, 186, 239, 0.8)',
          'rgba(200, 217, 242, 0.8)',
          'rgba(227, 236, 249, 0.8)',
        ],
        hoverBackgroundColor: [
          'rgba(64, 142, 253, 1)',
          'rgba(148, 186, 239, 1)',
          'rgba(200, 217, 242, 1)',
          'rgba(227, 236, 249, 1)',
        ],
      },
    ],
  };

  options: any = {
    cutout: '60%',
    plugins: {
      legend: {
        display: false,
        labels: {
          color: 'rgba(37, 44, 50, 1)',
        },
      },
    },
  };
}
