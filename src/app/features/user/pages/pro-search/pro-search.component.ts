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
import { ProDetails, ProResponse } from '../../../service-discovery/models/pro-details';
import { RouterLink } from '@angular/router';
import { Position } from '../../../service-discovery/models/position';
import { GeolocationService } from '../../../service-discovery/services/geolocation.service';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { FooterComponent } from "../../components/footer/footer.component";

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-pro-search',
  standalone: true,
  imports: [ProInfoCardComponent, UserProfileHeaderComponent, NavbarComponent, MatIconModule, AutoCompleteModule, ReactiveFormsModule, CommonModule, RouterLink, FooterComponent],
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
    const selectedService = this.formGroup.value.selectedService

    if (this.formGroup.valid) {  
      const serviceName = selectedService
  
      const location = { lng: this.currentLocation?.longitude, lat: this.currentLocation?.latitude }
  
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
