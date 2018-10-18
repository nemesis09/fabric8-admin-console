import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersDataStore {

  private _users = new BehaviorSubject([]);

  constructor() { }

  get users() {
    return this._users.asObservable();
  }

  addUsers(users) {
    this._users.next(users);
  }
}
