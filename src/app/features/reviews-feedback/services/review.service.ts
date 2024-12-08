import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ireview } from '../models/ireview';
import { environment } from '../../../../environments/environment';
import { catchError, Observable, retry } from 'rxjs';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient, private errorHandler: ErrorHandlingService) { }

  createReview(body: Ireview): Observable<Ireview> {
    return this.http.post<Ireview>(`${environment.searchUrl}/reviews`, body).pipe(
      retry(2),
      catchError(error => this.errorHandler.handleError(error))
    )
  }
}
