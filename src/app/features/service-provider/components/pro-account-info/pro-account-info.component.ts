import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-pro-account-info',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './pro-account-info.component.html',
  styleUrl: './pro-account-info.component.sass',
})
export class ProAccountInfoComponent {}
