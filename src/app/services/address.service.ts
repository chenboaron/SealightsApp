import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/city.model';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  baseUrl: string = 'http://localhost:3000/api'
  constructor(private http: HttpClient) { }

  addCity(city: City, country: Country): Observable<any> {
    return this.http.post(`${this.baseUrl}/city`, { id: city.id, name: city.name, countryId: country.id });
  }

  getCitiesByCountryId(countryId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/cities/${countryId}`);
  }

  getCountries(): Observable<any> {
    return this.http.get(`${this.baseUrl}/countries`);
  }
}
