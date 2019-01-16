import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersContainerComponent } from '../users-container/users-container.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AUTH_API_URL, SSO_API_URL, WIT_API_PROXY, REALM, UserService, AuthenticationService } from 'ngx-login-client';
import { ADMIN_API_URL } from 'src/app/shared/admin-api';
import { Broadcaster, Logger } from 'ngx-base';
import { Router } from '@angular/router';

describe('UserContainerComponent', () => {
  let component: UsersContainerComponent;
  let fixture: ComponentFixture<UsersContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersContainerComponent ],
      providers: [
        { provide: AUTH_API_URL, useValue: 'https://auth.example.com/api/' },
        { provide: SSO_API_URL, useValue: 'https://sso.example.com/auth/api/' },
        { provide: WIT_API_PROXY, useValue: 'https://wit.example.com/api/'},
        { provide: ADMIN_API_URL, useValue: 'https://admin.example.com/api/'},
        { provide: REALM, useValue: 'realm' },
        Broadcaster,
      Logger,
      UserService,
      HttpClient,
      AuthenticationService,
      HttpHandler,
      {
        provide: Router
      }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
