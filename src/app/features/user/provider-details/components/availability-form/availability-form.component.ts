import { Component } from '@angular/core';
import { PasswordInputComponent } from "../../../../profile-management/components/password-input/password-input.component";

@Component({
  selector: 'app-availability-form',
  standalone: true,
  imports: [PasswordInputComponent],
  templateUrl: './availability-form.component.html',
  styleUrl: './availability-form.component.sass'
})
export class AvailabilityFormComponent {
  isProAvailable = false;
}
