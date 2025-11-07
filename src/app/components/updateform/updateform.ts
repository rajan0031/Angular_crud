import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';
import { updateUser } from '../../../utils/Users.api';
import { AllUsersService } from '../../all-users-service';

@Component({
  selector: 'app-updateform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './updateform.html',
  styleUrl: './updateform.css',
})
export class Updateform implements OnChanges {
  @Input() data: any;

  updateForm: FormGroup;

  constructor(private fb: FormBuilder, private allUsersService: AllUsersService) {
    this.updateForm = this.fb.group({
      Name: [''],
      Email: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data) {
      this.updateForm.patchValue({
        Name: this.data.name,
        Email: this.data.email
      });
    }
  }

  async onSubmit() {
    try {
      const { Name, Email } = this.updateForm.value;

      const response = await axios.put(`${updateUser}/${this.data.id}`, {
        Name,
        Email,
        Password: this.data.password
      });

      console.log("User updated:", response.data);

      await this.allUsersService.getAllUsersList();


    } catch (err) {
      console.error("Error updating user:", err);
    }
  }


}
