import { Component } from '@angular/core';
import { CalendarComponent } from "../../../schedule-manager/components/calendar/calendar.component";

@Component({
  selector: 'app-scheduling',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './scheduling.component.html',
  styleUrl: './scheduling.component.sass'
})
export class SchedulingComponent {

}
