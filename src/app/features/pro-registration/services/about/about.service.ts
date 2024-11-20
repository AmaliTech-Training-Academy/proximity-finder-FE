import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { About } from '../../models/about';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private url = environment.bUrl;
  private http = inject(HttpClient);

  getAbout(data:About):Observable<About> {
    return this.http.get<About>(`${this.url}/v1/about`);
  }
}
