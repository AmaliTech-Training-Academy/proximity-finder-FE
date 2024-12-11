import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { CallsComponent } from '../calls/calls.component';
import { QuotesComponent } from '../quotes/quotes.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { BookingsComponent } from '../bookings/bookings.component';

@Component({
  selector: 'app-request-table',
  standalone: true,
  imports: [
    TabMenuModule,
    CommonModule,
    TabViewModule,
    QuotesComponent,
    CallsComponent,
    CalendarModule,
    FormsModule,
    BookingsComponent,
  ],
  templateUrl: './request-table.component.html',
  styleUrl: './request-table.component.sass',
})
export class RequestTableComponent {
  date: Date | undefined;
}
