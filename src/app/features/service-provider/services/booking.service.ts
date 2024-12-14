import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BookingData } from '../../profile-management/models/bookingData';
import { catchError, Observable, retry } from 'rxjs';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  apiUrl = environment.quote;
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlingService
  ) {}

  bookProvider(bookingData: BookingData): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/bookings`, bookingData).pipe(
      retry(2),
      catchError((error) => this.errorHandler.handleError(error))
    );
  }
}
