import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../service-provider/services/booking.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-seeker-bookings',
  standalone: true,
  imports: [],
  templateUrl: './seeker-bookings.component.html',
  styleUrl: './seeker-bookings.component.sass',
})
export class SeekerBookingsComponent implements OnInit {
  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService
      .getSeekerBookings()
      .pipe(take(1))
      .subscribe({
        next: (bookings) => console.log(bookings),
      });
  }
}
