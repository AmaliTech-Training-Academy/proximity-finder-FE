import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { BookingFormComponent } from '../../../seeker/components/booking-form/booking-form.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    TableModule,
    DatePipe,
    DialogModule,
    ButtonModule,
    InputTextModule,
    BookingFormComponent,
  ],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.sass',
})
export class BookingsComponent {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  onCloseDialogClicked(visible: boolean) {
    this.visible = visible;
  }
}
