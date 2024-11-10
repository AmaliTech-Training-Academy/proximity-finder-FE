import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.sass'
})
export class UserProfileComponent {
  isFormActive = false
  isAccountClicked = false

  toggleAccountDetails() {
    this.isAccountClicked = !this.isAccountClicked
  }
}
