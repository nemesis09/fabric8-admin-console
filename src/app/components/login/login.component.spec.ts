import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from '../login/login.component';
import { LoginService } from 'src/app/services/login.service';
import { AuthenticationService, AUTH_API_URL, SSO_API_URL, WIT_API_PROXY, REALM, UserService } from 'ngx-login-client';
import { Broadcaster, Logger } from 'ngx-base';
import { ADMIN_API_URL } from 'src/app/shared/admin-api';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
describe('loginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        LoginService,
        AuthenticationService,
        Broadcaster,
        { provide: AUTH_API_URL, useValue: 'https://auth.example.com/api/' },
        { provide: SSO_API_URL, useValue: 'https://sso.example.com/auth/api/' },
        { provide: WIT_API_PROXY, useValue: 'https://wit.example.com/api/'},
        { provide: ADMIN_API_URL, useValue: 'https://admin.example.com/api/'},
        { provide: REALM, useValue: 'realm' },
      Broadcaster,
      Logger,
      UserService,
      HttpClient,
      HttpHandler,
      AuthenticationService,
      {
        provide: Router
      }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
