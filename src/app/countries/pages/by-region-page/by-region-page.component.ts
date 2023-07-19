import { Component } from '@angular/core';

import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {
  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectionRegion?: Region;

  constructor(private countriesService: CountriesService) { }

  searchByRegion(region: Region) {

    this.selectionRegion = region;

    this.countriesService.searchCountryService('region', region)
      .subscribe(countries => {
        this.countries = countries;
      });
  }
}
