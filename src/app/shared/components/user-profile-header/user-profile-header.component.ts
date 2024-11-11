import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile-header',
  standalone: true,
  imports: [],
  templateUrl: './user-profile-header.component.html',
  styleUrl: './user-profile-header.component.sass'
})
export class UserProfileHeaderComponent {
  isAuthenticated = false
}
