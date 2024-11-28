import { LocalStorageService } from './../../../../shared/services/local-storage.service';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { About } from '../../models/about';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private apiUrl = environment.registration;
  private http = inject(HttpClient);

  sendAbout(data: FormData,options?: { headers: HttpHeaders }): Observable<About> {
    console.log('Yes')
    return this.http.post<About>(`${this.apiUrl}/v1/about`, data, options);
  }
}
