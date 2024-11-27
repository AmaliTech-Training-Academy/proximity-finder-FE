import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SvgService } from '../../../../shared/services/svg.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CountryService } from '../../../../shared/services/country.service';
import { ServiceService } from '../../../../core/services/service.service';
import { CommonModule } from '@angular/common';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ MatIconModule, AutoCompleteModule, ReactiveFormsModule, CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.sass'
})
export class HeroComponent implements OnInit {
  categories: string[] = []
  filteredCategories: string[] = []

  constructor(private svgService: SvgService, private countryService: CountryService, private service: ServiceService, private fb: FormBuilder) {}


  countries: any[] | undefined;

  formGroup: FormGroup = this.fb.group({
      selectedCountry: [''],
      selectedService: ['']
  })

    

    

    filteredCountries: any[] = [];

    ngOnInit() {
      this.service.serviceCategories$.subscribe(serviceCategory => {
        this.categories = serviceCategory.map(category => category.name)
      })


      this.countryService.getCountries().then((countries) => {
          this.countries = countries;
      });
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

    filterCountry(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.countries as any[]).length; i++) {
            let country = (this.countries as any[])[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }
}
