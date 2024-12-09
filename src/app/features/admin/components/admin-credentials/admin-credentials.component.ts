import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-credentials',
  standalone: true,
  imports: [],
  templateUrl: './admin-credentials.component.html',
  styleUrl: './admin-credentials.component.sass'
})
export class AdminCredentialsComponent {
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
