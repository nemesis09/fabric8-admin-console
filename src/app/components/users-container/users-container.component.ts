import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'ngx-login-client';
import { Subscription } from 'rxjs';
import { UserStore } from '../../store/user.store';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private userStore: UserStore, private userService: UserService) {}

  ngOnInit() {}

  searchUsers(searchTerm: string): void {
    this.isSearchComplete = false;
    this.subscriptions.add(
      this.userService.getUsersByName(searchTerm).subscribe(
        (users: User[]) => {
          this.users = users;
          this.isSearchComplete = true;
          this.userStore.addUsers(users);
        },
        () => {
          this.isSubscriptionError = false;
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
