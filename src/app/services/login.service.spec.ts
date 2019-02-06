
import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { AUTH_API_URL, SSO_API_URL, WIT_API_PROXY, AuthenticationService } from 'ngx-login-client';
import { ADMIN_API_URL } from '../shared/admin-api';
import { Broadcaster, Logger } from 'ngx-base';
import { Router } from '@angular/router';
import { WindowService } from './window.service';
import { RouterTestingModule } from '@angular/router/testing';
describe('LoginService', () => {
  let service: LoginService;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
  const authServiceSpy = jasmine.createSpyObj('AuthenticationService',
      [ 'logIn', 'logout', 'onLogIn', 'isLoggedIn' ]);

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [RouterTestingModule.withRoutes([])],
          providers: [
              LoginService,
              {
                provide: WindowService,
                useFactory: () => {
                  const windowService: jasmine.SpyObj<WindowService> = jasmine.createSpyObj('WindowService', ['getNativeWindow']);
                   windowService.getNativeWindow.and.returnValue({});
                  return windowService;
                }
              },
              { provide: AuthenticationService, useValue: authServiceSpy },
              { provide: Router, useValue: routerSpy },
                Broadcaster,
              Logger,
              { provide: AUTH_API_URL, useValue: 'https://auth.example.com/auth/api/'},
              { provide: SSO_API_URL, useValue: 'https://sso.example.com/auth/api/'},
              { provide: WIT_API_PROXY, useValue: 'https://wit.example.com/api/'},
              { provide: ADMIN_API_URL, useValue: 'https://admin.example.com/api/'},
          ]
      });
      service = TestBed.get(LoginService);
  });

  it('should be createable', () => {
      expect(service).toBeTruthy();
  });
  it('should call logIn its an existing login', () => {
      const windowService: jasmine.SpyObj<WindowService> = TestBed.get(WindowService);
      windowService.getNativeWindow.and.returnValue({
        location: {
            search: '?token_json=some_token'
        }
      });
     // console.log('getNative', windowService.getNativeWindow());
      const originalUrl: string = routerSpy.url;
      service.login();
      expect(authServiceSpy.logIn).toHaveBeenCalled();
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(originalUrl);
      });
  it('should call isLoggedIn and onLogIn when its a new login', () => {
    const windowService: jasmine.SpyObj<WindowService> = TestBed.get(WindowService);
    windowService.getNativeWindow.and.returnValue({
      location: {
        search: '?token_json=error'
      }
    });
        authServiceSpy.isLoggedIn.and.returnValue(true);
        authServiceSpy.logIn.and.stub();
        service.login();
        expect(authServiceSpy.isLoggedIn).toHaveBeenCalled();
        expect(authServiceSpy.onLogIn).toHaveBeenCalled();
      });
});
