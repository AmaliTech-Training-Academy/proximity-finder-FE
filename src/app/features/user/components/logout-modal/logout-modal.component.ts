import { Component } from '@angular/core';
import { SvgService } from '../../../../shared/services/svg.service';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-modal',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './logout-modal.component.html',
  styleUrl: './logout-modal.component.sass'
})
export class LogoutModalComponent {
  constructor(private svgService: SvgService, private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
