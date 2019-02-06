import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { AuthenticationService, User, UserService } from 'ngx-login-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedInUser = false;
  loggedInUser: User;
  showMenu = false;
  showDropDownMenu = false;

  constructor(
    private authService: AuthenticationService,
    private loginService: LoginService,
    private userService: UserService) {
    this.isLoggedInUser = this.authService.isLoggedIn();
    this.userService.loggedInUser.subscribe(
      (val: User): void => {
        if (val.id) {
          this.loggedInUser = val;
        } else {
          this.loggedInUser = null;
        }
      }
    );
  }

  ngOnInit() {
    console.log('app.component.ts');
    this.loginService.login();
    this.isLoggedInUser = this.authService.isLoggedIn();
  }

  handleLogout() {
    this.loginService.logout();
  }

  toggleSideNavState() { // click handler
    let bool: boolean = this.showMenu;
    this.showMenu = bool === false ? true : false;
  }

  toggleDropDownState() {
    let bool: boolean = this.showDropDownMenu;
    this.showDropDownMenu = bool === false ? true : false;
  }
}
