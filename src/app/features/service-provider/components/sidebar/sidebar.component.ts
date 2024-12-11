import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '../../../profile-management/services/profile.service';
import { User } from '../../../profile-management/models/user';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { AsyncPipe } from '@angular/common';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.sass',
})
export class SidebarComponent {
  loggedInUser!: User | null;
  @Input() role!: string;
  userRole: string = '';

  constructor(
    public profileService: ProfileService,
    private authService: AuthService,
    private router: Router,
    public localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.profileService.loggedInUser$.subscribe({
      next: (user) => (this.loggedInUser = user),
      error: (error) => console.error('Could not get user'),
    });

    this.userRole = JSON.parse(
      this.localStorageService.getItem('userRoles') as string
    )[0];
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }
}
