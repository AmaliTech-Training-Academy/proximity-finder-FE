import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Efaqs, Faq, Faqs } from '../models/faqs';

@Injectable({
  providedIn: 'root'
})
export class HelpAndSupportService {
  private apiUrl = environment.faq;

  constructor(private http:HttpClient) { }

  getFaqGroups(){
    return this.http.get(`${this.apiUrl}/faq-groups`);
  }

  getAllFaqs():Observable<Faq[]>{
    return this.http.get<Faq[]>(`${this.apiUrl}/faqs`);
  }

  createFaq(data:Faqs):Observable<Faqs[]>{
    return this.http.post<Faqs[]>(`${this.apiUrl}faqs`,data);
  }
  editFaq(data:Efaqs):Observable<Efaqs[]>{
    return this.http.put<Efaqs[]>(`${this.apiUrl}faqs/${data.id}`,data);
  }
  deleteFaq(data:Efaqs):Observable<Efaqs[]>{
    return this.http.delete<Efaqs[]>(`${this.apiUrl}faqs/${data.id}`);
  }

}
