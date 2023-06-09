import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) {

  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(res => {
      this.userService.users = res
    }, error => {
      console.log(error);

    });
  }

  navigateToUserForm() {
    this.router.navigateByUrl('user-form')
  }
}