import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '../../../profile-management/services/profile.service';
import { User } from '../../../profile-management/models/user';
import { AuthService } from '../../../auth/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.sass',
})
export class SidebarComponent {
  loggedInUser!: User | null;
  @Input() role!: string;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.profileService.loggedInUser$.subscribe({
      next: (user) => (this.loggedInUser = user),
      error: (error) => console.error('Could not get user'),
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }
}
