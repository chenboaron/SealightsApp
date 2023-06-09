import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Country } from 'src/app/models/country.model';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  @Input() countries!: Country[];
  selectedCountry: Country | undefined;
  constructor(private addressService: AddressService) { }

  ngOnInit(): void {

  }


  onChangeCountry(event: any) {
    this.addressService.getCitiesByCountryId(+event.target.value).subscribe(res => {
      this.countries = this.countries.map(x => {
        if (x.id === +event.target.value) {
          this.selectedCountry = x;
          x.cities = res
        }
        return x;
      })
    }, error => {
      console.log(error);

    })
  }

  addCity() {
    //to do open dailog 
    if (this.selectedCountry) {
      const city = {
        name: '',
        id: this.selectedCountry.cities.length + 1,
      }
      this.addressService.addCity(city, this.selectedCountry).subscribe(res => {
        console.log(res);
        this.countries = this.countries.map(x => {
          if (x.id === this.selectedCountry?.id) {
            x.cities.push(city)
          }
          return x;
        })

      })
    }
  }


}
