import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AUTH_API_URL, AuthenticationService, SSO_API_URL, REALM, WIT_API_PROXY, AuthInterceptor, UserService } from 'ngx-login-client';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { Broadcaster, Logger } from 'ngx-base';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/layout/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { UsersContainerComponent } from './components/users-container/users-container.component';
import { UsersListComponent } from './components/users-container/users-list/users-list.component';
import { UserStore } from './store/user.store';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ListModule, ToolbarModule, FilterModule } from 'patternfly-ng';
import { FormsModule } from '@angular/forms';
import { CacheInterceptor } from './shared/cache.interceptor';
import { RequestCache } from './services/request-cache.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    HeaderComponent,
    UsersContainerComponent,
    UsersListComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ListModule,
    FilterModule,
    FormsModule,
    ToolbarModule
  ],
  providers: [
    AuthenticationService,
    Broadcaster,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    { provide: AUTH_API_URL, useValue: 'https://auth.prod-preview.openshift.io/api/' },
    { provide: SSO_API_URL, useValue: 'https://sso.prod-preview.openshift.io/api/' },
    { provide: WIT_API_PROXY, useValue: 'https://prod-preview.openshift.io/api/' },
    { provide: REALM, useValue: 'realm' },
    Logger,
    RequestCache,
    UserService,
    UserStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
