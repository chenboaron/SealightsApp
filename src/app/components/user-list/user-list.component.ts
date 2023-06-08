import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  userList: User[] = [];

  constructor(private userService: UserService) {
    this.userList = userService.getUsers();
  }

  navigateToUserForm() {
    // Implement navigation to the user form view
  }
}
