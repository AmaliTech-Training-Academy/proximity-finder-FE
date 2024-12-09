import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { PlaceSearchResult } from '../../../../core/models/place-search-result';

/// <reference types="googlemaps" />

@Component({
  selector: 'app-business-address',
  standalone: true,
  templateUrl: './business-address.component.html',
  styleUrl: './business-address.component.sass',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BusinessAddressComponent),
      multi: true,
    },
  ],
})
export class BusinessAddressComponent implements ControlValueAccessor {
  @ViewChild('inputField') inputField!: ElementRef;
  @Output() placeSelected = new EventEmitter<PlaceSearchResult>();

  autoComplete!: google.maps.places.Autocomplete;
  private _value: string = '';

  
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

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


  writeValue(value: string): void {
    this._value = value;
    if (this.inputField) {
      this.inputField.nativeElement.value = value;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (this.inputField) {
      this.inputField.nativeElement.disabled = isDisabled;
    }
  }
}
