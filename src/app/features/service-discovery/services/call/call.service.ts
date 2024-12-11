import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Call, CallData } from '../../models/call';

@Injectable({
  providedIn: 'root'
})
export class CallService {
  private url = environment.quote;


  constructor(private http:HttpClient) { }

  sendCallRequest(data:Call):Observable<Call[]>{
    return this.http.post<Call[]>(`${this.url}call-request`, data);
  }

  getCallRequest(){
    return this.http.get<CallData[]>(`${this.url}call-request`);
  }

  changeStatus(id: number, status: string) {
    return this.http.patch(`${this.url}call-request/${id}/status`, { status });
  }
  
  
}
