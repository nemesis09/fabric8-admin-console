import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { AuthenticationService } from 'ngx-login-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedInUser = false;

  constructor(private authService: AuthenticationService, private loginService: LoginService) {
    this.loggedInUser = this.authService.isLoggedIn();
  }

  ngOnInit() {
    this.loginService.login();
    this.loggedInUser = this.authService.isLoggedIn();
  }

  handleLogout() {
    this.loginService.logout();
  }
}
