import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal, ViewChild } from '@angular/core';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { months } from '../../../../utils/months';
import { NOTYF } from '../../../../shared/notify/notyf.token';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, FormsModule, ReactiveFormsModule, DropdownModule, DialogModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.sass'
})
export class CalendarComponent {

   calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]
   calendarApi: any
   months = months
   selectedMonth = new FormControl(new Date().getMonth())
   visible: boolean = false
   @ViewChild(FullCalendarComponent) fullCalendar!: FullCalendarComponent
   private notyf =inject(NOTYF)

    calendarOptions = signal<CalendarOptions>({
      plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
      ],
      headerToolbar: {
        left: '',
        center: '',
        right: ''
      },
      initialView: 'timeGridWeek',
      dayHeaderFormat: {
        day: 'numeric',
        weekday: 'short',
      }})

  ngAfterViewInit() {
    if (this.fullCalendar) {
      this.calendarApi = this.fullCalendar.getApi();
    }
  }

  ngOnInit() {
    this.selectedMonth.valueChanges.subscribe((monthValue) => {
      if (monthValue !== null) {
        this.changeMonth(monthValue)
      }
    });
  }

  changeMonth(monthValue: number) {
    const currentYear = new Date().getFullYear();
  
    if (monthValue >= 0 && monthValue <= 11) {
      if (this.calendarApi) {
        const targetDate = new Date(currentYear, monthValue, 1)
        
        if (targetDate instanceof Date && !isNaN(targetDate.getTime())) {
          this.calendarApi.gotoDate(targetDate)
        } else {
          console.error('Invalid date:', targetDate)
          this.notyf.error('Invalid date')
        }
      } else {
        console.error('calendarApi is not initialized')
        this.notyf.error('Calendar API is not initialized')
      }
    } else {
      console.error('Invalid month value:', monthValue)
      this.notyf.error('Invalid month value')
    }
  }
  
  

  navigateToToday() {
    if (this.calendarApi) {
      this.calendarApi.today();
    }
  }

  navigateToNext() {
    if (this.calendarApi) {
      this.calendarApi.next();
    }
  }

  navigateToPrevious() {
    if (this.calendarApi) {
      this.calendarApi.prev();
    }
  }

  showDialog() {
    this.visible = true;
  }

}
