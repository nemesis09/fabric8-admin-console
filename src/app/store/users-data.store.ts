import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'ngx-login-client';

@Injectable({
  providedIn: 'root'
})
export class UsersDataStore {

  private _users: BehaviorSubject<User[]> = new BehaviorSubject([]);

  get users() {
    return this._users.asObservable();
  }

  addUsers(users: User[]) {
    this._users.next(users);
  }
}
