
import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AUTH_API_URL, SSO_API_URL, WIT_API_PROXY, REALM, UserService, AuthenticationService } from 'ngx-login-client';
import { ADMIN_API_URL } from '../shared/admin-api';
import { Broadcaster, Logger } from 'ngx-base';
import { Router } from '@angular/router';

describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({
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
      AuthenticationService,
      {
        provide: Router
      }
    ]
  }));

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });
});
