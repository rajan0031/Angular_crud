import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import { getAllUser } from '../utils/Users.api';

@Injectable({
  providedIn: 'root',
})
export class AllUsersService {
  private usersSubject = new BehaviorSubject<any[]>([]);
  users$ = this.usersSubject.asObservable();

  async getAllUsersList(): Promise<void> {
    try {
      const response = await axios.get(getAllUser);
      this.usersSubject.next(response.data);
    } catch (err) {
      console.log("Error fetching users:", err);
      this.usersSubject.next([]);
    }
  }
}
