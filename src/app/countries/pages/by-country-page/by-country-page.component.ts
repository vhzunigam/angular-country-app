import { Component, Input, OnInit } from '@angular/core';

import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private countriesServie: CountriesService) { }

  searchByCountry(term: string) {
    this.isLoading = true;

    this.countriesServie.searchCountryService('name', term)
      .subscribe(countries => {
        this.countries = countries

        this.isLoading = false;
      });
  }
  ngOnInit(): void {
    this.countries = this.countriesServie.cacheStore.byCountry.countries;
    this.initialValue = this.countriesServie.cacheStore.byCountry.term;
  }
}
