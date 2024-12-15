import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BookingService } from '../../services/booking.service';
import { BookingData } from '../../../profile-management/models/bookingData';
import { Menu, MenuModule } from 'primeng/menu';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    MenuModule,
    TagModule,
  ],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.sass',
})
export class BookingsComponent implements OnInit {
  visible: boolean = false;
  providerBookings!: BookingData[];
  selectedBookingId: number | undefined;

  @ViewChild('menu') menu!: Menu;

  options = [
    {
      label: 'Accept',
      icon: 'pi pi-check',
      command: () => {
        this.acceptBooking();
      },
    },
    {
      label: 'Complete',
      icon: 'pi pi-check-circle',
      command: () => {
        this.completeBooking();
      },
    },
    {
      label: 'Decline',
      icon: 'pi pi-times',
      command: () => {
        this.declineBooking();
      },
    },
  ];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.getProviderBookings().subscribe({
      next: (bookings) => (this.providerBookings = bookings),
      error: (error) => console.error('Failed to fetch bookings'),
    });
  }

  refreshBookings() {
    this.bookingService.getProviderBookings().subscribe({
      next: (bookings) => (this.providerBookings = bookings),
      error: (error) => console.error('Failed to fetch bookings'),
    });
  }

  openBookingOptions(event: any, boookingId: number, status: string) {
    // console.log(status);
    this.options = this.getOptionsBasedOnStatus(status);
    this.selectedBookingId = boookingId;
    this.menu.toggle(event);
  }

  getOptionsBasedOnStatus(status: string) {
    switch (status) {
      case 'PENDING':
        return [
          {
            label: 'Complete',
            icon: 'pi pi-check-circle',
            command: () => {
              this.completeBooking();
            },
          },
          {
            label: 'Decline',
            icon: 'pi pi-times',
            command: () => {
              this.declineBooking();
            },
          },
        ];
      case 'ACCEPTED':
        return [
          {
            label: 'Complete',
            icon: 'pi pi-check-circle',
            command: () => {
              this.completeBooking();
            },
          },
        ];
      case 'COMPLETED':
        return [
          {
            label: 'View Details',
            icon: 'pi pi-info-circle',
            command: () => {},
          },
        ];
      case 'DECLINED':
        return [
          {
            label: 'View Details',
            icon: 'pi pi-info-circle',
            command: () => {},
          },
        ];
      default:
        return this.options;
    }
  }

  acceptBooking() {
    this.bookingService
      .acceptBooking(this.selectedBookingId as number)
      .subscribe({
        next: (response) => {
          this.refreshBookings();
          console.log(response);
        },
      });
  }

  declineBooking() {
    this.bookingService
      .declineBooking(this.selectedBookingId as number)
      .subscribe({
        next: (response) => {
          this.refreshBookings();
          console.log(response);
        },
      });
  }

  completeBooking() {
    this.bookingService
      .completeBooking(this.selectedBookingId as number)
      .subscribe({
        next: (response) => {
          this.refreshBookings();
          console.log(response);
        },
      });
  }

  showDialog() {
    this.visible = true;
  }
}
