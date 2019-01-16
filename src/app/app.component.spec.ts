import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ListModule, FilterModule, ToolbarModule, ToastNotificationModule } from 'patternfly-ng';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/layout/page-not-found/page-not-found.component';
import { APP_BASE_HREF } from '@angular/common';
import {
  AuthenticationService,
  UserService,
  AuthInterceptor,
  AUTH_API_URL,
  SSO_API_URL,
  WIT_API_PROXY,
  REALM
} from 'ngx-login-client';
import { Logger, Broadcaster } from 'ngx-base';
import { UserStore } from './store/user.store';
import { RouterModule, Routes, Router } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

describe('AppComponent', () => {
  const appRoutes: Routes = [
    { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, HomeComponent, LoginComponent, PageNotFoundComponent],
      imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ListModule,
        FilterModule,
        FormsModule,
        ToolbarModule,
        ToastNotificationModule,
        RouterModule.forRoot(appRoutes)
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        },
        AuthenticationService,
        UserService,
        Logger,
        Broadcaster,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        },
        {
          provide: AUTH_API_URL,
          useValue: 'https://auth.prod-preview.openshift.io/api/'
        },
        {
          provide: SSO_API_URL,
          useValue: 'https://sso.prod-preview.openshift.io/api/'
        },
        {
          provide: WIT_API_PROXY,
          useValue: 'https://prod-preview.openshift.io/api/'
        },
        {
          provide: REALM,
          useValue: 'realm'
        },
        UserStore,
        ToastNotificationModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
