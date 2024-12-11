import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [TableModule, DatePipe],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.sass',
})
export class BookingsComponent {}
