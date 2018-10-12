import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStore {

  private _users = new BehaviorSubject('');

  constructor() { }

  get users() {
    return this._users.asObservable();
  }

  addUsers(username) {
    this._users.next(username);
    console.log('(in data-store) users saved');
  }
}
