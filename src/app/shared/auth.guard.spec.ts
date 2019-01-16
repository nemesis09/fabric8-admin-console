import { TestBed, inject } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
 import { AuthenticationService, AUTH_API_URL, SSO_API_URL, WIT_API_PROXY, REALM, UserService
 } from 'ngx-login-client';
 import { Broadcaster, Logger } from 'ngx-base';
 import { HttpClient, HttpHandler } from '@angular/common/http';
 import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ADMIN_API_URL } from './admin-api';

  describe('AuthGuard', () => {
   beforeEach(() => {
     TestBed.configureTestingModule({
       providers: [
         AuthenticationService,
         LoginService,
         { provide: AUTH_API_URL, useValue: 'https://auth.example.com/api/' },
         { provide: SSO_API_URL, useValue: 'https://sso.example.com/auth/api/' },
         { provide: WIT_API_PROXY, useValue: 'https://wit.example.com/api/'},
         { provide: ADMIN_API_URL, useValue: 'https://admin.example.com/api/'},
         { provide: REALM, useValue: 'realm' },
         Broadcaster,
         Logger,
         UserService,
         {
           provide: Router
         },
         HttpClient,
         HttpHandler
       ]
     });
   });

    it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
     expect(guard).toBeTruthy();
   }));
 });
