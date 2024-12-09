import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Quote } from '../../models/quoteData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private quote = environment.quote

  constructor(private http:HttpClient) { }

  createQuote(data: Quote | FormData): Observable<Quote> {
    return this.http.post<Quote>(`${this.quote}/quotes`, data);
  }
  

}
