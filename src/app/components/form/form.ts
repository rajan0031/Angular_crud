import { Component, EventEmitter, Output } from '@angular/core'; // Angular core imports 
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';
import { addUser } from '../../../utils/Users.api';
import { AllUsersService } from '../../all-users-service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrls: ['./form.css']
})
export class Form {
  userForm: FormGroup;

 

  constructor(private fb: FormBuilder, private allUsersService: AllUsersService) {
    this.userForm = this.fb.group({
      Name: [''],
      Email: [''],
      Password: ['']
    });
  }

  async onSubmit() {
    try {
      const { Name, Email, Password } = this.userForm.value;

      const response = await axios.post(addUser, { Name, Email, Password });
      console.log("User added:", response.data);

      await this.allUsersService.getAllUsersList();
   
    } catch (err) {
      console.error("Error adding user:", err);
    }
  }

 
}
