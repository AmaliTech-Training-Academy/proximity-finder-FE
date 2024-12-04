import { Component } from '@angular/core';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.sass'
})
export class PhotosComponent {
  images: string[] = [
    'assets/images/core.png',
    'assets/images/occupation.png',
    'assets/images/occupation.png',
    'assets/images/occupation.png',
    'assets/images/occupation.png',
    'assets/images/occupation.png',
    'assets/images/cover-image.png',
    'assets/images/background.jpg',
    'assets/images/Hero.png'
  ];
}
