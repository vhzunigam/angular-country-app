import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from "rxjs";

import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  searchCountrybyAlphaCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }

  searchCountryService(path: string, term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/${path}/${term}`;

    console.log(url);

    return this.http.get<Country[]>(url)
      .pipe(
        tap(countries => {
          switch (path) {
            case 'capital':
              this.cacheStore.byCapital = { term, countries }
              break;
            case 'name':
              this.cacheStore.byCountry = { term, countries }
              break;
            case 'region':
              const region: Region = <Region>term; // as Region
              this.cacheStore.byRegion = { region, countries }
              break;
          }
        }),
        tap(() => this.saveToLocalStorage()),
        catchError(() => of([])),
      );
  }

}
