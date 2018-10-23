import { Injectable, Inject } from '@angular/core';
import { AUTH_API_URL, AuthenticationService } from 'ngx-login-client';
import { Router } from '@angular/router';
import { Broadcaster } from 'ngx-base';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  static readonly REDIRECT_URL_KEY = 'redirectUrl';
  static readonly DEFAULT_URL = '/_home';
  static readonly LOGIN_URL = '/login';

  constructor(
    private authService: AuthenticationService,
    private broadcaster: Broadcaster,
    private router: Router,
    @Inject(AUTH_API_URL) private authApiUrl: string
  ) {
    this.broadcaster.on('authenticationError').subscribe(() => {
      this.logout();
    });
  }

  redirectToAuth(): void {
    const redirectUrl = encodeURIComponent(window.location.href);
    const loginUrl = `${this.authApiUrl}login?redirect=${redirectUrl}`;
    window.location.href = loginUrl;
  }

  redirectAfterLogin(): void {
    const url = this.redirectUrl;
    this.router.navigateByUrl(url);
  }

  redirectToLogin(currentUrl: string): void {
    this.redirectUrl = currentUrl;
    window.location.href = LoginService.LOGIN_URL;
  }

  login(): void {
    const query = window.location.search.substr(1);
    const result: any = {};
    query.split('&').forEach(function(part) {
      const item: any = part.split('=');
      result[item[0]] = decodeURIComponent(item[1]);
    });

    if (result['error']) {
      console.log(result['error']);
    }

    if (result['token_json']) {
      console.log(result);
      // Handle the case that this is a login
      this.authService.logIn(result['token_json']);
      // Navigate back to the current URL to clear up the query string
      // this.router.navigateByUrl(this.router.url);
    } else if (this.authService.isLoggedIn()) {
      // Handle the case the user is already logged in
      this.authService.onLogIn();
    }
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/';
  }

  set redirectUrl(value: string) {
    if (value) {
      localStorage.setItem(LoginService.REDIRECT_URL_KEY, value);
    }
  }

  get redirectUrl(): string {
    const res = localStorage.getItem(LoginService.REDIRECT_URL_KEY);
    localStorage.removeItem(LoginService.REDIRECT_URL_KEY);
    return res;
  }
}

