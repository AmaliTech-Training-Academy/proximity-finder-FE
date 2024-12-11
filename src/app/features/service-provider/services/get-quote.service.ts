import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetQuoteService {
  private quote = environment.quote

  constructor(private http:HttpClient) { }

  getAllQuotes(){
    return this.http.get(`${this.quote}/provider`)
  }
}
