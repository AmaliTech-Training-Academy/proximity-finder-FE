import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../models/userData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
apiUrl:string ='http://16.170.246.127:8080/api/auth/public/sign-in'

  constructor(private http:HttpClient) { }

  login(data:IUser):Observable<IUser>{
    return this.http.post<IUser>(this.apiUrl,data)
  }
}
