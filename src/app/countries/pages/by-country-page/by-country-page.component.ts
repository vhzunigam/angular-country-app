import { Component, Input } from '@angular/core';

import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {
  @Input()
  public countries: Country[] = [];

  constructor(private countriesServie: CountriesService) { }

  searchByCountry(term: string) {
    this.countriesServie.searchCountryService('name', term)
      .subscribe(countries => {
        this.countries = countries
      });
  }
}
