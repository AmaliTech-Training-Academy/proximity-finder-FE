import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '../../../features/profile-management/services/profile.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../features/profile-management/models/user';
import { IProfile } from '../../../features/profile-management/models/profile';
import { CommonModule } from '@angular/common';
import { ROLE_ADMIN, ROLE_PROVIDER, ROLE_SEEKER } from '../../../utils/roles';

@Component({
  selector: 'app-user-profile-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './user-profile-header.component.html',
  styleUrl: './user-profile-header.component.sass'
})
export class UserProfileHeaderComponent implements OnInit{
  loggedInUser: User | null = null
  loggedInSubcription!: Subscription
  userProfile!: Observable<IProfile>
  defaultImage = 'assets/images/default-avatar.png'

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit(): void {
    this.loggedInSubcription = this.profileService.loggedInUser$.subscribe((user) => {
      this.loggedInUser = user
    })

    this.userProfile = this.profileService.getClient()
  }
  
  navigateToProfile(): void {
    const [role] = this.loggedInUser?.role || []
    if (role === ROLE_ADMIN) {
      this.router.navigate(['/admin/dashboard/profile'])
    }
    else if (role === ROLE_SEEKER) {
      this.router.navigate(['/profile'])
    }
    else if (role === ROLE_PROVIDER) {
      this.router.navigate(['/provider/dashboard'])
    }
  }

  ngOnDestroy(): void {
    this.loggedInSubcription.unsubscribe()
  }

}
