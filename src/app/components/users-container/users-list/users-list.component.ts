import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { User } from 'ngx-login-client';
import { BehaviorSubject, Subject } from 'rxjs';

export enum ViewState {
  INIT = 'INIT',
  EMPTY = 'EMPTY',
  LOADING = 'LOADING',
  SHOW = 'SHOW'
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnChanges {

  viewState: Subject<ViewState> = new BehaviorSubject<ViewState>(ViewState.INIT);

  @Input() users: User[];
  @Input() isSearchComplete: boolean;
  ascending: Boolean;

  items: User[];
  isAscendingSort: Boolean = false;
  filterCount = 0;
  noUser = -1;

  ngOnInit(): void {
  }
  ngOnChanges(change: SimpleChanges) {
    if (!change.isSearchComplete.firstChange) {
      if (change.isSearchComplete.currentValue) {
        this.items = change.users ? change.users.currentValue : this.users;
        this.viewState.next(this.items.length !== 0 ? ViewState.SHOW : ViewState.EMPTY);
      } else {
        this.viewState.next(ViewState.LOADING);
      }
}
  }
  filterUser( filterTerm: string) {
    this.filterCount = 0;
    this.items = [];
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].attributes.fullName.toLowerCase().indexOf(filterTerm.toLowerCase()) !== -1 ||
      this.users[i].attributes.email.toLowerCase().indexOf(filterTerm.toLowerCase()) !== -1 ||
      this.users[i].attributes.username.toLowerCase().indexOf(filterTerm.toLowerCase()) !== -1) {
        this.items.push(this.users[i]);
        this.filterCount++;
      }
  }
    if (this.filterCount === 0) {
      this.noUser = 0;
    }
  }
  clearFilter() {
    this.items = [];
    this.filterCount = 0;
    this.items = this.users;
    this.noUser = -1;
  }
  sortUser(field: String) {
    this.ascending = !this.ascending;
    this.isAscendingSort = !this.isAscendingSort;
    this.items.sort((item1: any, item2: any) => this.compare(item1, item2, field));
  }
  // Sort
  compare(item1: any, item2: any, field: String): number {
    let compValue = 0;
    if (field === 'fullName') {
      compValue = item1.attributes.fullName.localeCompare(item2.attributes.fullName, 'en', {
        sensitivity: 'base'
      });
    } else {
      if (field === 'email') {
        compValue = item1.attributes.email.localeCompare(item2.attributes.email, 'en', {
          sensitivity: 'base'
        });
      }
    }
    if (!this.isAscendingSort) {
      compValue = compValue * -1;
    }
    return compValue;
  }
}
