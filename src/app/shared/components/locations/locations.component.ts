/// <reference types="googlemaps" />
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { PlaceSearchResult } from '../../../core/models/place-search-result';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.sass'
})
export class LocationsComponent {
  @ViewChild('inputField') inputField!: ElementRef;
  autoComplete!: google.maps.places.Autocomplete;
  @Output() placeSelected = new EventEmitter<PlaceSearchResult>();
  constructor() {}

  ngAfterViewInit() {
    this.autoComplete = new google.maps.places.Autocomplete(this.inputField.nativeElement);

    this.autoComplete.addListener('place_changed', () => {
      const place = this.autoComplete.getPlace();

      if(place && place.geometry) {

        const result: PlaceSearchResult = {
          address: this.inputField.nativeElement.value,
          name: place?.name,
          location: place?.geometry?.location,
          iconUrl: place?.icon,
          coordinates: {
            lng: place.geometry.location.lng(),
            lat: place.geometry.location.lat()
          }
        }
  
        this.placeSelected.emit(result);
      }
      else {
        console.warn('No valid place selected.');
      }
    });
  }
}
