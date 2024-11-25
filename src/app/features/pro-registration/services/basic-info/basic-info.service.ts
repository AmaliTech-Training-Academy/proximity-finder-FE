import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userDetails, userInfo } from '../../models/userData';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BasicInfoService {
private url = environment.baseUrl
private http = inject(HttpClient);

  constructor(private localStorageService: LocalStorageService) { }

  getBasicInfo(email: string): Observable<userDetails> {
    console.log('Calling API for Basic Info');
    const params = new HttpParams().set('email', email);
    return this.http.get<userDetails>(`${this.url}/auth/info`, { params });
  }
  
  
  sendInfo(data: userInfo): Observable<userInfo> {
    const token = this.localStorageService.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<userInfo>(
      `${this.url}/auth/update/info`,
      data,
      { headers }
    );
  }
}
