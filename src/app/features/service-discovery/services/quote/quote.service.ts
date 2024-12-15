import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { acceptQuote, declineQuote, getQuote, Quote, ResponseData } from '../../../service-provider/models/quoteData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private url = environment.quote;

  constructor(private http:HttpClient) { }

  sendQuote(formData: FormData): Observable<Quote[]> {
    return this.http.post<Quote[]>(`${this.url}/quotes`, formData);
  }
  
  getCreatedQuotes():Observable<getQuote[]>{
    return this.http.get<getQuote[]>(`${this.url}/quotes/creator`);
  }
  getSingleQuoteCreated(quoteId: number) {
    return this.http.get<getQuote>(`${this.url}/quotes/${quoteId}/creator/details`);
  }


  getQuotes(){
    return this.http.get<ResponseData>(`${this.url}/requests/assigned`);
  }

  getSingleQuote(requestId: number) {
    return this.http.get<getQuote>(`${this.url}/requests/quote/${requestId}`);
  }

  acceptRequest(data:acceptQuote,requestId:number):Observable<acceptQuote[]>{
    return this.http.put<acceptQuote[]>(`${this.url}/quotes/${requestId}/status/approve`,data);
  }
  declineRequest(data:declineQuote,requestId:number):Observable<declineQuote[]>{
    return this.http.put<declineQuote[]>(`${this.url}/quotes/${requestId}/status/decline`,data);
    
  }
  


}
