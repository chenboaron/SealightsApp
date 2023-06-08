import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      address: this.formBuilder.group({
        addressName: ['', Validators.required],
        street: ['', Validators.required]
      })
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user: User = {
        id: 1, // Generate unique ID or fetch from server
        name: this.userForm.get('userName')?.value,
        birthdate: new Date().toISOString(),
        addresses: [{
          name: this.userForm.get('address.addressName')?.value,
          countryId: 0, // Replace with the actual country ID
          cityId: 0, // Replace with the actual city ID
          street: this.userForm.get('address.street')?.value
        }]
      };
  
      this.userService.addUser(user);
      this.userForm.reset();
    }
  }
}