import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Support } from '../models/clarification';
import { Faqs } from '../models/faqs';

@Injectable({
  providedIn: 'root'
})
export class ViewFaqService {
  private apiUrl = environment.faq;

  constructor(private http:HttpClient) { }

  sendSupport(data:Support):Observable<Support[]>{
    return this.http.post<Support[]>(`${this.apiUrl}contact-support`,data);
  }


  
  getFaqByGroup(data: string): Observable<Faqs[]> {
        return this.http.get<Faqs[]>(`${this.apiUrl}faqs/group?type=${data}`);
  }

  
  
  


}
