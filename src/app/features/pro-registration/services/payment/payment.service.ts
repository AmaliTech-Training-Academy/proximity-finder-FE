import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import {
  Bank,
  BankPayment,
  MobilePayment,
  Payment,
  paymentPreference,
  PayPalPayment,
  serviceProviders,
} from '../../models/payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = environment.registration;
  private http = inject(HttpClient);

  getAllBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>(`${this.apiUrl}/v1/banks`);
  }

  getAllPrefernces(): Observable<paymentPreference[]> {
    return this.http.get<paymentPreference[]>(
      `${this.apiUrl}/v1/payment-preferences`
    );
  }

  getAllProviders(): Observable<serviceProviders[]> {
    return this.http.get<serviceProviders[]>(
      `${this.apiUrl}/v1/payment-method/providers/mobile-money-providers`
    );
  }

  sendPaymentDetails(paymentData: PayPalPayment | BankPayment | MobilePayment): Observable<Payment[]> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    return this.http.post<Payment[]>(
      `${this.apiUrl}/v1/payment-method`,
      paymentData,
      { headers }
    );
  }
}
