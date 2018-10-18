import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'ngx-login-client';
import { Subscription } from 'rxjs';
import { UsersDataStore } from '../../services/users-data.store';

@Component({
  selector: 'app-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.css']
})
export class UsersContainerComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[];
  users: any[];
  errorLog;

  constructor(
    private userService: UserService,
    private userStore: UsersDataStore
    ) { }

  ngOnInit() { }

  searchUsers(searchTerms) {
    this.subscriptions.push (
      this.userService.getUsersBySearchString(searchTerms).subscribe(
        users => {
          this.users = users;
          this.userStore.addUsers(users);
        },
        err => this.errorLog = err
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
  }
}
