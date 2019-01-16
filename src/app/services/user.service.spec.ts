import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';

import { Broadcaster, Logger } from 'ngx-base';
import { UserService } from '../services/user.service';
import { AUTH_API_URL, SSO_API_URL, WIT_API_PROXY, AuthenticationService, REALM, User } from 'ngx-login-client';
import { ADMIN_API_URL } from '../shared/admin-api';

describe('Service: User service', () => {
  let httpMock: HttpTestingController;
  let userService: UserService;
  let url: string;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AUTH_API_URL, useValue: 'https://auth.example.com/api/' },
        { provide: SSO_API_URL, useValue: 'https://sso.example.com/auth/api/' },
        { provide: WIT_API_PROXY, useValue: 'https://wit.example.com/api/'},
        { provide: ADMIN_API_URL, useValue: 'https://admin.example.com/api/'},
        { provide: REALM, useValue: 'realm' },
        Broadcaster,
        Logger,
        UserService,
        AuthenticationService
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
    url = TestBed.get(ADMIN_API_URL);
    userService = TestBed.get(UserService);
  });
  const testUser: User[] = [{
    'attributes': {
      'fullName': 'name',
      'imageURL': '',
      'username': 'myUser'
    },
    'id': 'userId',
    'type': 'userType'
  }];
  it('Get user by user name returns valid user', (done) => {
    userService.getUsersByName('name').subscribe((user) => {
      expect(user[0].attributes.fullName).toEqual('name');
      done();
    });
    const req = httpMock.expectOne(`${url}search/users?q=name`);
    req.flush({data: testUser});
  });
  it('Get user by user name returns null if no user matched', (done) => {
    userService.getUsersByName('nouser').subscribe((user) => {
      expect(user.length).toEqual(0);
      done();
    });
    const req = httpMock.expectOne(`${url}search/users?q=nouser`);
    req.flush({data: []});
  });
});
