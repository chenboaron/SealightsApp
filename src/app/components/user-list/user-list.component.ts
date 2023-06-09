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
  userList: User[] = [];

  constructor(private userService: UserService, private router: Router) {

  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(res => {
      console.log(res);
      this.userList = res;
      debugger
    }, error => {
      console.log(error);

    });
  }

  navigateToUserForm() {
    this.router.navigateByUrl('user-form')
  }
}