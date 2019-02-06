import { Component, OnInit} from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AuthenticationService } from 'ngx-login-client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private authService: AuthenticationService) {}

  ngOnInit() {
    console.log('home.component.ts');
    if (this.authService.isLoggedIn()) {
      this.loginService.redirectAfterLogin();
    }
  }

  handleLogin(): void {
    this.loginService.redirectToAuth();
  }
}
