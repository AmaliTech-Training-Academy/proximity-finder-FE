import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { PlaceSearchResult } from '../../../../core/models/place-search-result';
/// <reference types="googlemaps" />

@Component({
  selector: 'app-business-address',
  standalone: true,
  imports: [],
  templateUrl: './business-address.component.html',
  styleUrl: './business-address.component.sass'
})
export class BusinessAddressComponent {
  @ViewChild('inputField') inputField!: ElementRef;
  autoComplete!: google.maps.places.Autocomplete;
  @Output() placeSelected = new EventEmitter<PlaceSearchResult>();
  constructor() {}

  ngAfterViewInit() {
    this.autoComplete = new google.maps.places.Autocomplete(this.inputField.nativeElement);

    this.autoComplete.addListener('place_changed', () => {
      const place = this.autoComplete.getPlace();

      const result: PlaceSearchResult = {
        address: this.inputField.nativeElement.value,
        name: place?.name,
        location: place?.geometry?.location,
        iconUrl: place?.icon,
      }

      this.placeSelected.emit(result);
    });
  }

}