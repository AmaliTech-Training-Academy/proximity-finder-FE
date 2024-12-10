import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ireview, reviewResponse } from '../models/ireview';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, catchError, Observable, retry, tap } from 'rxjs';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewsSubject = new BehaviorSubject<reviewResponse>({ status: '', result: [] });
  reviews$ = this.reviewsSubject.asObservable();

  constructor(private http: HttpClient, private errorHandler: ErrorHandlingService) { }

  createReview(body: Ireview): Observable<Ireview> {
    return this.http.post<Ireview>(`${environment.searchUrl}/reviews`, body).pipe(
      retry(2),
      catchError(error => this.errorHandler.handleError(error))
    )
  }

  getReviews(): void {
    this.http.get<reviewResponse>(`${environment.searchUrl}/reviews`).pipe(
      retry(2),
      catchError(error => this.errorHandler.handleError(error)),
      tap(reviews => this.reviewsSubject.next(reviews)),
      catchError(error => this.errorHandler.handleError(error))
    ).subscribe()
  }
}

