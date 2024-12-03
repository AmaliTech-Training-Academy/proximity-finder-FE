import { Component, inject, OnInit } from '@angular/core';
import { ProInfoCardComponent } from "../../../../shared/components/pro-info-card/pro-info-card.component";
import { UserProfileHeaderComponent } from "../../../../shared/components/user-profile-header/user-profile-header.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { MatIconModule } from '@angular/material/icon';
import { ServiceService } from '../../../../core/services/service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { filterItemsByQuery } from '../../../../utils/filterCategories';
import { ProviderDataService } from '../../../service-discovery/services/provider-data.service';
import { ProDetails } from '../../../service-discovery/models/pro-details';
import { RouterLink } from '@angular/router';
import { Position } from '../../../service-discovery/models/position';
import { GeolocationService } from '../../../service-discovery/services/geolocation.service';
import { NOTYF } from '../../../../shared/notify/notyf.token';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-pro-search',
  standalone: true,
  imports: [ProInfoCardComponent, UserProfileHeaderComponent, NavbarComponent, MatIconModule, AutoCompleteModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './pro-search.component.html',
  styleUrl: './pro-search.component.sass'
})
export class ProSearchComponent implements OnInit{
  categories: string[] = []
  providers: ProDetails[] = []
  filteredCategories: string[] = []
  currentLocation: Position | null = null
  private notyf = inject(NOTYF)
  

  constructor(private service: ServiceService, private fb: FormBuilder, private providerService: ProviderDataService,
              private locationService: GeolocationService
  ) {}

  formGroup: FormGroup = this.fb.group({
    selectedService: ['', Validators.required],
  })


  ngOnInit() {
    this.service.serviceCategories$.subscribe(serviceCategory => {
    this.categories = serviceCategory.map(category => category.name)
    })

    this.providerService.providers$.subscribe((providers) => {
      this.providers = providers;
    })

    this.getLocation()
  }

  async getLocation() {
    try {
      this.currentLocation = await this.locationService.getCurrentLocation()
    } catch (error) {
      console.error(error)
  }
}

  filterCategories(event: AutoCompleteCompleteEvent) {
    this.filteredCategories = filterItemsByQuery(this.categories, event.query);
  }

  onSelectedService() {
  const selectedService = this.formGroup.value.selectedService;
  console.log('Selected Service:', selectedService);

  if (this.formGroup.valid && selectedService) {
    const serviceName = selectedService;
    const location = { 
      lng: this.currentLocation?.longitude ?? 0,
      lat: this.currentLocation?.latitude ?? 0 
    };

    const lat = location.lng;
    const lng = location.lat;
    console.log('Search Parameters:', { serviceName, lat, lng });

    this.locationService.getNearbyProviders(serviceName, lat, lng).subscribe({
      next: (providers) => {
        console.log('Providers:', providers);
        if (providers && providers.length > 0) {
          this.providerService.setProviders(providers);
          this.providers = providers;
        } else {
          console.warn('No providers found');
        }
      },
      error: (error) => {
        console.error('Search Error:', error);
        this.notyf.error('An error occurred while fetching providers');
      }
    });
  } else {
    console.warn('Form is invalid or selected service is missing');
  }
}


  onSortChange(event: Event): void {
    const selectedOption = (event.target as HTMLSelectElement).value

    if (selectedOption === 'recent') {
      this.sortByMostRecent()
    }
    else if (selectedOption === 'popular') {
      this.sortByMostPopular()
    }
  }

  sortByMostRecent() {
    this.providers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  sortByMostPopular() {

  }
}
