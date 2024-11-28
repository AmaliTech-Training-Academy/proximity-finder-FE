import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SvgService } from '../../../../shared/services/svg.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from '../../../../core/services/service.service';
import { CommonModule } from '@angular/common';
import { LocationsComponent } from "../../../../shared/components/locations/locations.component";
import { PlaceSearchResult } from '../../../../core/models/place-search-result';

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
export class HeroComponent implements OnInit {
  categories: string[] = []
  filteredCategories: string[] = []
  placeValue: PlaceSearchResult | undefined;

  constructor(private svgService: SvgService, private service: ServiceService, private fb: FormBuilder) {}

  formGroup: FormGroup = this.fb.group({
      selectedCountry: [''],
      selectedService: ['']
  })

    
  ngOnInit() {
    this.service.serviceCategories$.subscribe(serviceCategory => {
      this.categories = serviceCategory.map(category => category.name)
    })
  }

  filterCategories(event: AutoCompleteCompleteEvent) {
    let filtered: string[] = []
    let query = event.query

    for (let i = 0; i < this.categories.length; i++) {
      let category = this.categories[i]
      if (category.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(category)
      }
    }

    this.filteredCategories = filtered
  }
}
