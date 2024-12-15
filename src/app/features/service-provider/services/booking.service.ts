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
  apiUrl = environment.bookingUrl;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlingService
  ) {}

  bookProvider(bookingData: BookingData): Observable<unknown> {
    return this.http.post(`${this.apiUrl}`, bookingData).pipe(
      retry(2),
      catchError((error) => this.errorHandler.handleError(error))
    );
  }

  getProviderBookings(): Observable<BookingData[]> {
    return this.http.get<BookingData[]>(`${this.apiUrl}/provider`).pipe(
      retry(2),
      catchError((error) => this.errorHandler.handleError(error))
    );
  }

  acceptBooking(bookingId: number) {
    return this.http.put(`${this.apiUrl}/${bookingId}/accept`, bookingId);
  }

  declineBooking(bookingId: number) {
    return this.http.put(`${this.apiUrl}/${bookingId}/decline`, bookingId);
  }

  completeBooking(bookingId: number) {
    return this.http.put(`${this.apiUrl}/${bookingId}/complete`, bookingId);
  }
}
