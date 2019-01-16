import { TestBed, async } from '@angular/core/testing';

import { UserStore } from './user.store';
import { BehaviorSubject } from 'rxjs';
import { User } from 'ngx-login-client';
import { error } from '@angular/compiler/src/util';

describe('UsersStore', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const store: UserStore = TestBed.get(UserStore);
    expect(store).toBeTruthy();
  });
  it('should add and then get the latest User upon expecting', async(() => {
    let store: UserStore;
    store = TestBed.get(UserStore);
    const testUser = [{
      'attributes': {
        'fullName': 'name',
        'imageURL': '',
        'username': 'myUser'
      },
      'id': 'userId',
      'type': 'userType'
    }];
    const otherUser = [{
      'attributes': {
        'fullName': 'name1',
        'imageURL': '',
        'username': 'myUser1'
      },
      'id': 'userId1',
      'type': 'userType1'
    }];
    store.addUsers(testUser); // adding first user
    store.addUsers(otherUser); // adding  otherUser
    store.users.subscribe(users => {
      expect(users).toBe(otherUser); // expecting otherUser
    });
  }));
});
