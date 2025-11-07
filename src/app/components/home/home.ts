import { Component } from '@angular/core';
import { Form } from '../form/form';
import { Updateform } from '../updateform/updateform';
import axios from 'axios';
import { deleteUser } from '../../../utils/Users.api';
import { AllUsersService } from '../../all-users-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Form, Updateform],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  flag = false;
  editFlag = false;
  users: any[] = [];
  editFormDetails: any = null;

  constructor(private allUsersService: AllUsersService) {}

  ngOnInit() {
    // Subscribe to the users observable
    this.allUsersService.users$.subscribe(users => {
      this.users = users;
      console.log("Updated user list:", users);
    });

    // Trigger initial fetch
    this.allUsersService.getAllUsersList();
  }

  handleFormOpen() {
    this.flag = true;
  }

  handleCancellButton() {
    this.flag = false;
    this.editFlag = false;
    this.editFormDetails = null;
  }

  async handleFormSubmitted() {
    this.flag = false;
    await this.allUsersService.getAllUsersList(); // refresh user list after form submission 
  }



  handleEdit(user: any) {
    this.editFlag = true;
    this.editFormDetails = user;
  }

  async handleDelete(id: number) {
    try {
      await axios.delete(`${deleteUser}/${id}`);
      console.log("User deleted:", id);
      await this.allUsersService.getAllUsersList(); // refresh user list after deletion
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }
}
