import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Country } from 'src/app/models/country.model';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  countries!: Country[];

  constructor(private formBuilder: FormBuilder, private userService: UserService, private addressService: AddressService) {
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      birthday: ['', Validators.required],
      addresses: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.addressService.getCountries().subscribe((res: Country[]) => {
      this.countries = res;
      debugger
    }, error => {
      console.log(error);
    })
    this.addAddress()
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user: User = {
        id: 1, // Generate unique ID or fetch from server
        name: this.userForm.get('userName')?.value,
        birthdate: this.userForm.get('birthday')?.value,
        addresses: this.userForm.get('addresses')?.value
      };

      this.userService.addUser(user).subscribe(res => {
        console.log(res);
        debugger

      });
      this.userForm.reset();
    }
  }

  addAddress() {
    const addresses = this.userForm.get('addresses') as FormArray;
    addresses.push(this.createAddressFormGroup());
  }

  removeAddress(index: number) {
    const addresses = this.userForm.get('addresses') as FormArray;
    addresses.removeAt(index);
  }

  createAddressFormGroup() {
    return this.formBuilder.group({
      addressName: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  getAddressFormArrayControls() {
    return (this.userForm.get('addresses') as FormArray)?.controls || [];
  }

  getAddressFormGroup(index: number) {
    return (this.userForm.get('addresses') as FormArray)?.at(index) as FormGroup;
  }
}
