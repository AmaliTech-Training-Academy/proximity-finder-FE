import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { callData } from '../../models/callData';

@Injectable({
  providedIn: 'root'
})
export class CallService {
  private quote = environment.quote

  constructor(private http:HttpClient) { }

  sendCallRequest(data:callData):Observable<callData>{
    return this.http.post<callData>(`${this.quote}/v1/call-request`, data);
  }


}
