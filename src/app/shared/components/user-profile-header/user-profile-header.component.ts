import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '../../../features/profile-management/services/profile.service';
import { Subscription } from 'rxjs';
import { User } from '../../../features/profile-management/models/user';

@Component({
  selector: 'app-user-profile-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './user-profile-header.component.html',
  styleUrl: './user-profile-header.component.sass'
})
export class UserProfileHeaderComponent implements OnInit{
  loggedInUser: User | null = null
  private subscription: Subscription = new Subscription()

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit(): void {
    this.profileService.loggedInUser$.subscribe((user) => {
      this.loggedInUser = user
    })
  }
  
  navigateToProfile(): void {
    const [role] = this.loggedInUser?.role || []
    if (role === 'ROLE_ADMIN') {
      this.router.navigate(['/admin/profile'])
    }
    else if (role === 'SEEKER') {
      this.router.navigate(['/profile'])
    }
    else {
      this.router.navigate(['/provider/dashboard'])
    }
  
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
