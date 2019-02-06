import { Injectable, Inject } from '@angular/core';
import { User, AuthenticationService, AUTH_API_URL } from 'ngx-login-client';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { ADMIN_API_URL } from '../shared/admin-api'; // not working!
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  searchUrl: string;
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.authService.getToken()}`
  });

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    @Inject(AUTH_API_URL) authUrl: string // using auth Url
  ) {
    this.searchUrl = authUrl + 'search/users?'; // using auth Url
  }

  getUsersByName(searchTerm: string): Observable < User[] > {
    const params = this.searchUrl + `q=${searchTerm}`;
    if (searchTerm && searchTerm !== '') {
      return this.http
        .get<{data: User[]}>(params, {headers: this.headers})
        .pipe(
          // tap((res) => console.log(res)),
          map((res) => res.data)
        );
    }
    return of([]);
  }
}
