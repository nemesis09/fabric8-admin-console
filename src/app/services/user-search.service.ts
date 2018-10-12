import { Injectable, OnDestroy, Inject  } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataStore } from './data.store';
import { AUTH_API_URL } from 'ngx-login-client';

@Injectable({
  providedIn: 'root'
})

export class UserSearchService implements OnDestroy {

  private apiResult; // stores the http observable returned from the api
  private resultSubscription: Subscription; // stores the subscription to apiResult

  constructor(
    private http: HttpClient,
    private savedata: DataStore,
    @Inject(AUTH_API_URL) private authApiUrl: string
    ) {
  }

  public getusers(username: string = null) {
    if (username != null) {
      console.log('(in user-search Service) SUCCESS: received username ' , username, ' from app');

      const readyURL = `${this.authApiUrl}search/users?q=${username}`;

      if (username !== '') {

        console.log('(in user-search Service) calling API with URL ', readyURL);

        this.apiResult = this.http.get(readyURL); // API call

        this.resultSubscription = this.apiResult.subscribe(
          res => {
            console.log('(in user-search Service) SUCCESS: fetched users');
            console.log(res);
            console.log('(in user-search Service) saving users in data-store');
            this.savedata.addUsers(res.data);
          },
          err => {
            console.log('(in user-search Service) ERROR: no response from server due either of the following reasons:');
            console.log('*User does not exist\n *Bad Connection');
            console.log(err);
            alert('Data not Found!!');
          });
      } else {
        console.log('(in user-search Service) ERROR: invalid username ',  username);
        window.alert('Invalid Username');
      }

    } else {
      console.log('(in user-search Service) ERROR: did not receive username from app ', username);
    }
  }

  ngOnDestroy() {
    this.resultSubscription.unsubscribe();
  }
}
