import { Injectable, Inject } from '@angular/core';
import { AUTH_API_URL, AuthenticationService } from 'ngx-login-client';
import { Router } from '@angular/router';
import { Broadcaster } from 'ngx-base';
import { WindowService } from './window.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  static readonly REDIRECT_URL_KEY = 'redirectUrl';
  static readonly DEFAULT_URL = '/_home';
  static readonly LOGIN_URL = '/login';
  private window: Window;

  constructor(
    private windowService: WindowService,
    private authService: AuthenticationService,
    private broadcaster: Broadcaster,
    private router: Router,
    @Inject(AUTH_API_URL) private authApiUrl: string
  ) {
    this.window = this.windowService.getNativeWindow();
    this.broadcaster.on('authenticationError').subscribe(() => {
      this.logout();
    });
  }

  redirectToAuth(): void {
    // console.log('redirect to auth now');
    const redirectUrl = encodeURIComponent(location.href);
    // console.log(redirectUrl);
    const loginUrl = `${this.authApiUrl}login?redirect=${redirectUrl}`;
    // console.log('lognUrl' + loginUrl);
    this.window.location.href = loginUrl;
  }

  redirectAfterLogin(): void {
    // console.log('redirect to redirectAfterLogin');
    const url = this.redirectUrl;
    this.router.navigateByUrl(url);
  }

  redirectToLogin(currentUrl: string): void {
    // console.log('redirect to redirectToLogin');
    this.redirectUrl = currentUrl;
    this.window.location.href = LoginService.LOGIN_URL;
  }
  _search() { // added this function to allow testing
    // console.log('_search is:>>>>' + this.window.location.search.substr(1));
    return this.window.location.search.substr(1);
  }

  login(): void {
    // console.log('Login');
    // console.log('window', this.window);
    const query = this.window.location.search.substr(1);
    // console.log('query is":', query);
    const result: any = {};
    // console.log('result is this...' + result);
    query.split('&').forEach(function(part) {
      const item: any = part.split('=');
      result[item[0]] = decodeURIComponent(item[1]);
      // console.log('now result is - ', result, item);
    });

    if (result['error']) {
      // console.log('error is ' , result['error']);
    }

    if (result['token_json']) {
      // Handle the case that this is a login
      // console.log('result token - ' + result['token_json']);
      this.authService.logIn(result['token_json']);
      // Navigate back to the current URL to clear up the query string
      // this.router.navigateByUrl(this.router.url);
    } else if (this.authService.isLoggedIn()) {
      // Handle the case the user is already logged in
      this.authService.onLogIn();
    }
  }

  logout(): void {
    console.log('logging out');
    this.authService.logout();
    this.window.location.href = '/';
  }

  set redirectUrl(value: string) {
    if (value) {
      localStorage.setItem(LoginService.REDIRECT_URL_KEY, value);
    }
  }

  get redirectUrl(): string {
    console.log('redirect to redirectUrl');
    const res = localStorage.getItem(LoginService.REDIRECT_URL_KEY);
    localStorage.removeItem(LoginService.REDIRECT_URL_KEY);
    return res;
  }
}
