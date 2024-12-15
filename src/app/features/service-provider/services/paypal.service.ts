import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';
import { catchError, Observable, retry } from 'rxjs';
import { PayPal } from '../../profile-management/models/paypal';

@Injectable({
  providedIn: 'root',
})
export class PaypalService {
  apiUrl = environment.paymentsUrl;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlingService
  ) {}

  addPaypal(paypalData: PayPal): Observable<unknown> {
    return this.http.post<PayPal>(`${this.apiUrl}`, paypalData).pipe(
      retry(2),
      catchError((error) => this.errorHandler.handleError(error))
    );
  }
}
