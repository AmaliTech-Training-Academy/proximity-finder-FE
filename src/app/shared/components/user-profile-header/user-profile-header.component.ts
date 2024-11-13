import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user-profile-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './user-profile-header.component.html',
  styleUrl: './user-profile-header.component.sass'
})
export class UserProfileHeaderComponent {
  isAuthenticated = false
}
