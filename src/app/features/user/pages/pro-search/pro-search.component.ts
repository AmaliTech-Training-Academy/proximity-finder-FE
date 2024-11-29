import { Component, OnInit } from '@angular/core';
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

  constructor(private service: ServiceService, private fb: FormBuilder, private providerService: ProviderDataService) {}

  formGroup: FormGroup = this.fb.group({
    selectedService: ['', Validators.required],
  })


  ngOnInit() {
    this.service.serviceCategories$.subscribe(serviceCategory => {
    this.categories = serviceCategory.map(category => category.name)
    })

    this.providerService.providers$.subscribe((providers) => {
      this.providers = providers;
      console.log(this.providers)
    })
  }

  filterCategories(event: AutoCompleteCompleteEvent) {
    this.filteredCategories = filterItemsByQuery(this.categories, event.query);
  }
}
