import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, User } from 'ngx-login-client';
import { Subscription } from 'rxjs';
import { UserStore } from '../../store/user.store';

@Component({
  selector: 'app-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.css']
})
export class UsersContainerComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();
  users: User[];
  isSubscriptionError: boolean;
  isSearchComplete: boolean;

  constructor(
    private userService: UserService,
    private userStore: UserStore
   ) { }

  ngOnInit() {
    // this.isSearchComplete = false;
  }

  searchUsers(searchTerm: string): void {
    this.isSearchComplete = false;
    this.subscriptions.add(
      this.userService
        .getUsersBySearchString(searchTerm)
        .subscribe((users: User[]) => {
          this.users = users;
          this.isSearchComplete = true;
          this.userStore.addUsers(users);
        },
         err => {
          this.isSubscriptionError = false;
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
