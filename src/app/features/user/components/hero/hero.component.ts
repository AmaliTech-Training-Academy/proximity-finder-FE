import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SvgService } from '../../../../shared/services/svg.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../../../../core/services/service.service';
import { CommonModule } from '@angular/common';
import { LocationsComponent } from "../../../../shared/components/locations/locations.component";
import { PlaceSearchResult } from '../../../../core/models/place-search-result';
import { GeolocationService } from '../../../service-discovery/services/geolocation.service';
import { Position } from '../../../service-discovery/models/position';
import { Router } from '@angular/router';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { Subscription } from 'rxjs';
import { ProviderDataService } from '../../../service-discovery/services/provider-data.service';
import { ProDetails, ProResponse } from '../../../service-discovery/models/pro-details';
import { filterItemsByQuery } from '../../../../utils/filterCategories';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [MatIconModule, AutoCompleteModule, ReactiveFormsModule, CommonModule, LocationsComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.sass'
})
export class HeroComponent implements OnInit, OnDestroy {
  categories: string[] = []
  filteredCategories: string[] = []
  placeValue!: PlaceSearchResult | null
  currentLocation: Position | null = null
  private notyf = inject(NOTYF)
  serviceSubscription: Subscription | null = null
  providers: ProDetails[] = [];


  constructor(private svgService: SvgService, private service: ServiceService, private fb: FormBuilder,
              private locationService: GeolocationService, private router: Router,
              private providerService: ProviderDataService) {}

  formGroup: FormGroup = this.fb.group({
      selectedService: ['', Validators.required],
      selectedLocation: [null]
  })

    
  ngOnInit() {
    this.service.serviceCategories$.subscribe(serviceCategory => {
      this.categories = serviceCategory.map(category => category.name)
    })

    this.getLocation()

    this.providerService.providers$.subscribe((providers) => {
      this.providers = providers;
    });
  
  }

    async getLocation() {
      try {
        this.currentLocation = await this.locationService.getCurrentLocation()
      } catch (error) {
        console.error(error)
    }
  }

  onLocationSelected(place: PlaceSearchResult) {
    this.placeValue = place;
    
    this.formGroup.patchValue({
      selectedLocation: this.placeValue.coordinates
    });

  }

  filterCategories(event: AutoCompleteCompleteEvent) {
    this.filteredCategories = filterItemsByQuery(this.categories, event.query);
  }

  onSearch() {
    if (this.formGroup.valid) {  
      const { selectedService, selectedLocation } = this.formGroup.value
      const serviceName = selectedService
  
      const location = selectedLocation || { lng: this.currentLocation?.longitude, lat: this.currentLocation?.latitude }
  
      if (!location.lat || !location.lng) {
        console.error('Unable to determine location for the search.')
        this.notyf.error('Location is required to search for providers.')
        return
      }
  
      const lat = location.lng
      const lng = location.lat
  
      this.locationService.getNearbyProviders(serviceName, lng, lat).subscribe({
        next: (response: ProResponse) => {
          this.providerService.setProviders(response.content)
          this.router.navigate(['/search'])
        },
        error: (error) => {
          console.error(error)
          this.notyf.error('An error occurred while searching for providers. Please try again.')
        }
      });
    } else {
      console.error('Form is invalid')
      this.notyf.error('Please complete the form before searching.')
    }
  }
  

  ngOnDestroy() {
    this.serviceSubscription?.unsubscribe()
  }
  
}
