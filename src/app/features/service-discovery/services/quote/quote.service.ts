import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { acceptQuote, declineQuote, getQuote, Quote } from '../../../service-provider/models/quoteData';
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
  getSingleQuoteCreated(id: number) {
    return this.http.get<getQuote>(`${this.url}/quotes/provider/${id}/creator/details`);
  }


  getQuotes(){
    return this.http.get<getQuote[]>(`${this.url}/quotes/provider`);
  }

  getSingleQuote(id: number) {
    return this.http.get<Quote[]>(`${this.url}/quotes/provider/${id}/assignee/details`);
  }

  acceptRequest(data:acceptQuote,id:number):Observable<acceptQuote[]>{
    return this.http.put<acceptQuote[]>(`${this.url}/quotes/${id}/status/approve`,data);
  }
  declineRequest(data:declineQuote,id:number):Observable<declineQuote[]>{
    return this.http.put<acceptQuote[]>(`${this.url}/quotes/${id}/status/decline`,data);
    
  }
  


}
