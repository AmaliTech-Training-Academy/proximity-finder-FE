import { Injectable } from '@angular/core';
import { Position } from '../models/position';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry } from 'rxjs';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';
import { ProDetails, ProResponse } from '../models/pro-details';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private http: HttpClient, private errorhandler: ErrorHandlingService) { }

  getCurrentLocation(): Promise<Position> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation is not supported by your browser')
        return
      }

      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      (error) => {
        if(error.code === error.PERMISSION_DENIED) {
          this.showPermissionDeniedMessage()
        }
        reject(this.handleError(error))
      }
    )
    })
  }

  getNearbyProviders(serviceName:string, longitude: number, latitude: number): Observable<ProResponse> {
    const radius = 10000
    return this.http.get<ProResponse>(`${environment.searchUrl}/service-discovery/search?serviceName=${serviceName}&latitude=${latitude}&longitude=${longitude}&radius=${radius}`).pipe(
      retry(2),
      catchError((error) => this.errorhandler.handleError(error))
    )
  }

  private handleError(error: GeolocationPositionError): string {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'User denied the request for Geolocation.';
      case error.POSITION_UNAVAILABLE:
        return 'Location information is unavailable.';
      case error.TIMEOUT:
        return 'The request to get user location timed out.';
      default:
        return 'An unknown error occurred.';
    }
  }

  showPermissionDeniedMessage() {
    alert(
      `Location access is required to use this feature. Please enable location permissions in your browser or device settings.`
    );
  }

}
