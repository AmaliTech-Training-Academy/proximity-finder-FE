import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';
import { Event, EventResponse } from '../models/scheduler';
import { catchError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {

  eventUrl = 'http://113.29.247.162:8888/api/v1/quote-service/events'

  constructor(private http: HttpClient, private errorHandler: ErrorHandlingService) { }

  addEvent(event: Event) {
    return this.http.post<Event>(this.eventUrl, event).pipe(
      retry(2),
      catchError(error => this.errorHandler.handleError(error))
    )
  }

  getAllEvents() {
    return this.http.get<EventResponse[]>(this.eventUrl).pipe(
      retry(2),
      catchError(error => this.errorHandler.handleError(error))
    )
  }
}
