import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-popular-services',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './popular-services.component.html',
  styleUrl: './popular-services.component.sass',
})
export class PopularServicesComponent implements OnInit {
  data: any;

  options: any;

  ngOnInit(): void {
    this.data = {
      labels: ['Painting', 'Plumbing', 'Appliance Fixing'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            'rgba(64, 142, 253, 0.8)',
            'rgba(186, 230, 253, 0.8)',
            'rgba(125, 211, 252, 0.8)',
          ],
          hoverBackgroundColor: [
            'rgba(64, 142, 253, 1)',
            'rgba(186, 230, 253, 1)',
            'rgba(125, 211, 252, 1)',
          ],
        },
      ],
    };

    this.options = {
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
}
