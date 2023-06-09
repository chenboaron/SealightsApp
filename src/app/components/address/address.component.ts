import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/models/country.model';
import { AddressService } from 'src/app/services/address.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  @Input() countries!: Country[];
  selectedCountry: Country | undefined;
  dataFromDialog: any;

  constructor(private addressService: AddressService, private dialog: MatDialog) { }

  ngOnInit(): void {

  }


  onChangeCountry(event: any) {
    this.addressService.getCitiesByCountryId(event.value).subscribe(res => {
      this.countries = this.countries.map(x => {
        if (x.id === event.value) {
          this.selectedCountry = x;
          x.cities = res
        }
        return x;
      })
    }, error => {
      console.log(error);

    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { countryName: this.selectedCountry?.name },
      width: '350px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.dataFromDialog = data.form;
      if (data.clicked === 'submit') {
        this.addCity();
      }
    });
  }

  addCity() {
    if (this.selectedCountry) {
      const city = {
        name: this.dataFromDialog.city,
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

      }, error => {
        console.log(error);

      })
    }
  }


}
