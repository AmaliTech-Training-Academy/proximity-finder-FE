import { Component } from '@angular/core';

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [],
  templateUrl: './featured-projects.component.html',
  styleUrl: './featured-projects.component.sass'
})
export class FeaturedProjectsComponent {
  images: string[] = [
    'assets/images/core.png',
    'assets/images/occupation.png',
    'assets/images/Avatar.png',
    'assets/images/cover-image.png',
    'assets/images/background.jpg',
    'assets/images/Hero.png'
  ];
}
