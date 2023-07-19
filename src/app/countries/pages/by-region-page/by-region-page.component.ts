import { Component, OnInit } from '@angular/core';

import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectionRegion?: Region;
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) { }

  searchByRegion(region: Region) {

    this.selectionRegion = region;
    this.isLoading = true;

    this.countriesService.searchCountryService('region', region)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectionRegion = this.countriesService.cacheStore.byRegion.region;
  }
}
