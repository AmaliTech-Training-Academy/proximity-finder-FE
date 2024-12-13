import { Component, Input, OnInit } from '@angular/core';
import { PasswordInputComponent } from '../../../../profile-management/components/password-input/password-input.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BookingFormComponent } from '../../../../seeker/components/booking-form/booking-form.component';

@Component({
  selector: 'app-availability-form',
  standalone: true,
  imports: [
    PasswordInputComponent,
    ButtonModule,
    DialogModule,
    BookingFormComponent,
  ],
  templateUrl: './availability-form.component.html',
  styleUrl: './availability-form.component.sass',
})
export class AvailabilityFormComponent implements OnInit {
  @Input() providerEmail!: string;
  isProAvailable = true;

  visible: boolean = false;

  ngOnInit(): void {
    console.log(this.providerEmail);
  }

  showDialog() {
    this.visible = true;
  }

  onCloseDialogClicked(visible: boolean) {
    this.visible = visible;
  }
}
