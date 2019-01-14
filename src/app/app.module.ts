import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {
  AUTH_API_URL,
  AuthenticationService,
  SSO_API_URL,
  REALM,
  WIT_API_PROXY,
  AuthInterceptor,
  UserService
} from 'ngx-login-client';
import { UserService as userService } from '../app/services/user.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { Broadcaster, Logger } from 'ngx-base';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient, HttpParams } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/layout/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { UsersContainerComponent } from './components/users-container/users-container.component';
import { UsersListComponent } from './components/users-container/users-list/users-list.component';
import { UserStore } from './store/user.store';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ListModule, ToolbarModule, FilterModule, ToastNotificationModule } from 'patternfly-ng';
import { FormsModule } from '@angular/forms';
import { CacheInterceptor } from './shared/cache.interceptor';
import { RequestCache } from './services/request-cache.service';

import { ADMIN_API_URL } from './shared/admin-api';
import { environment } from '../../src/environments/environment';
import { WindowService } from './services/window.service';
import { PfnToolbarComponent } from './components/pfn-toolbar/pfn-toolbar.component';
import { DemoComponent } from './components/demo/demo.component';
import { AuditLogComponent } from './components/audit-log/audit-log.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    HeaderComponent,
    UsersContainerComponent,
    UsersListComponent,
    SearchBarComponent,
    PfnToolbarComponent,
    DemoComponent,
    AuditLogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ListModule,
    FilterModule,
    FormsModule,
    ToolbarModule,
    ToastNotificationModule
  ],
  providers: [
    AuthenticationService,
    Broadcaster,
    { provide: AUTH_API_URL, useValue: environment.authApiUrl },
    { provide: SSO_API_URL, useValue: environment.ssoApiUrl },
    { provide: WIT_API_PROXY, useValue: environment.witApiUrl },
    { provide: ADMIN_API_URL, useValue: environment.adminApiUrl },
    { provide: REALM, useValue: 'realm' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    HttpClient,
    Logger,
    RequestCache,
    UserService,
    UserStore,
    userService,
    WindowService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
