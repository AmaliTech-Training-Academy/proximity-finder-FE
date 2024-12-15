import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { months } from '../../../../utils/months';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { EventFormComponent } from "../event-form/event-form.component";
import { SchedulingService } from '../../services/scheduling.service';
import { formatDate, formatDateForFullCalendar, formatTime, formatTimeForFullCalendar } from '../../../../utils/dateFormatter';
import { Event, EventResponse, FormattedEvent } from '../../models/scheduler';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, FormsModule, ReactiveFormsModule, DropdownModule, DialogModule, EventFormComponent,
  OverlayPanelModule, ButtonModule, ToastModule, ConfirmPopupModule],
  providers: [ConfirmationService, MessageService],
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
  @ViewChild('op') overlayPanel!: OverlayPanel
  private notyf = inject(NOTYF)
  events = signal<FormattedEvent[]>([])
  selectedEvent: any = null
  

  constructor(private schedulingService: SchedulingService, private confirmationService: ConfirmationService, private messageService: MessageService) {}

  calendarOptions = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: '',
      center: '',
      right: ''
    },
    initialView: 'timeGridWeek',
    dayHeaderFormat: {
      day: 'numeric',
      weekday: 'short',
    },
    events: this.events(),
    eventClick: this.handleEventClick.bind(this),

  })

  ngAfterViewInit() {
    if (this.fullCalendar) {
      this.calendarApi = this.fullCalendar.getApi()
    }
  }

  ngOnInit() {
    this.selectedMonth.valueChanges.subscribe((monthValue) => {
      if (monthValue !== null) {
        this.changeMonth(monthValue)
      }
    })

    this.getAllEvents()
  }

  changeMonth(monthValue: number) {
    const currentYear = new Date().getFullYear()

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
      this.calendarApi.today()
    }
  }

  navigateToNext() {
    if (this.calendarApi) {
      this.calendarApi.next()
    }
  }

  navigateToPrevious() {
    if (this.calendarApi) {
      this.calendarApi.prev()
    }
  }

  showDialog() {
    this.visible = true
  }

  onEventFormSubmitted(formData: any) {
    const event = {
      ...formData,
      startDate: formatDate(formData.startDate),
      startTime: formatTime(formData.startTime),
      endDate: formatDate(formData.endDate),
      endTime: formatTime(formData.endTime),
    }

    this.schedulingService.addEvent(event).subscribe({
      next: (event) => {
        this.notyf.success('Event added successfully')
        this.visible = false
        this.addEventToCalendar(event)
      },
      error: (error) => {
        console.error('Error adding event:', error)
        if (error.status === 409) {
          this.notyf.error('Event already exists at the same time! Please choose a different time.')
        }
        else {
          this.notyf.error('Error adding event')
        }
      }
    })
  }
  
  getAllEvents() {
    this.schedulingService.getAllEvents().subscribe({
      next: (events) => {
        const formattedEvents = events.map((event: EventResponse) => {
          const startDate = formatDateForFullCalendar(event.startDate)
          const endDate = formatDateForFullCalendar(event.endDate)
          const startTime = formatTimeForFullCalendar(event.startTime)
          const endTime = formatTimeForFullCalendar(event.endTime)
  
          return {
            id: event.eventId,
            title: event.title,
            start: `${startDate}T${startTime}`,
            end: `${endDate}T${endTime}`,
            description: event.description,
          }
        })
        
        this.events.set(formattedEvents)
        if (this.calendarApi) {
          this.calendarApi.removeAllEventSources()
          this.calendarApi.addEventSource(formattedEvents)
        }
      },
      error: (error) => {
        console.error('Error fetching events:', error)
        this.notyf.error('Error fetching events')
      }
    });
  }
  
  addEventToCalendar(event: Event) {
    const startDate = formatDateForFullCalendar(event.startDate)
    const endDate = formatDateForFullCalendar(event.endDate)
    const startTime = formatTimeForFullCalendar(event.startTime)
    const endTime = formatTimeForFullCalendar(event.endTime)
  
    const formattedEvent = {
      title: event.title,
      start: `${startDate}T${startTime}`,
      end: `${endDate}T${endTime}`,
      description: event.description,
    }
  
    const updatedEvents = [...this.events(), formattedEvent]
    this.events.set(updatedEvents)
  
    if (this.calendarApi) {
      this.calendarApi.addEvent(formattedEvent)
      this.calendarApi.refetchEvents()
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    const startTime = clickInfo.event.start
    ? clickInfo.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'N/A'

  const endTime = clickInfo.event.end
    ? clickInfo.event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'N/A'

    this.selectedEvent = {
        id: clickInfo.event.id,
        title: clickInfo.event.title,
        description: clickInfo.event.extendedProps?.['description'] || 'No description',
        start: startTime,
        end: endTime,
    }

    this.overlayPanel.show(clickInfo.jsEvent)
  }



  confirmDelete(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const action = target.getAttribute('data-action');
  
    if (action === 'delete') {
      const eventToDelete = this.selectedEvent
  
      this.confirmationService.confirm({
        target: event.currentTarget as EventTarget,
        message: 'Do you want to delete this event?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
          const calendarEvent = this.calendarApi.getEventById(eventToDelete.id)
          if (calendarEvent) {
            calendarEvent.remove()
          }

          const eventId = Number(eventToDelete.id);
          this.schedulingService.deleteEvent(eventId).subscribe({
            next: () => {
              this.notyf.success('Event deleted successfully')
            },
            error: (error) => {
              console.error('Error deleting event:', error)
              this.notyf.error('Error deleting event')
            }
          });
        },
        reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 })
        }
      });
    }
  }
  
  


  
}

