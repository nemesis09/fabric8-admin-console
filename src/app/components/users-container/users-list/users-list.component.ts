import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { User } from 'ngx-login-client';
import {
  ListConfig,
  Filter,
  FilterConfig,
  FilterField,
  FilterEvent,
  FilterType,
  SortConfig,
  SortEvent,
  ToolbarConfig,
  SortField,
  NotificationType
} from 'patternfly-ng';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnChanges {
  @Input() users: User[];

  listConfig: ListConfig;
  filterConfig: FilterConfig;
  filtersText: String = '';
  items: User[];
  filterData: User[];
  isAscendingSort: Boolean = true;
  separator: Object;
  sortConfig: SortConfig;
  currentSortField: SortField;
  toolbarConfig: ToolbarConfig;
  header: String = 'No User Found';
  message: String = 'Please Try Again';
  type: string;
  types: string[];
  filterCount = 0;


  ngOnInit(): void {
    console.log('users after searching', this.users);
    this.types = [NotificationType.DANGER];
    this.type = this.types[0];

    this.filterConfig = {
      fields: [
        {
          id: 'name',
          title: 'Name',
          placeholder: 'Filter by Name...',
          type: FilterType.TEXT
        },
        {
          id: 'email',
          title: 'Email',
          placeholder: 'Filter by Email...',
          type: FilterType.TEXT
        }
      ] as FilterField[],
      appliedFilters: []
    } as FilterConfig;
    this.listConfig = {
      useExpandItems: true
    } as ListConfig;
    this.sortConfig = {
      fields: [
        {
          id: 'name',
          title: 'Name',
          sortType: 'alpha'
        },
        {
          id: 'email',
          title: 'Email',
          sortType: 'alpha'
        }
      ],
      isAscending: this.isAscendingSort
    } as SortConfig;
    this.toolbarConfig = {
      filterConfig: this.filterConfig,
      sortConfig: this.sortConfig
    } as ToolbarConfig;
  }
  ngOnChanges(changes: SimpleChanges) {
    this.items = changes.users.currentValue;
   // this.count = changes.count.currentValue;
  }
  filterUser( searchTerm: string) {
    this.filterCount = 0;
    console.log('searchTerm', searchTerm);
    if (!this.items || !searchTerm) {
      return this.items;
    }
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].attributes.fullName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
        console.log('data transfer');
          // this.filterData[i] = { ...this.items[i] };  Copy full object using spread operator
          console.log('filterData', this.filterData);
          this.filterCount++;
      }
  }
   // this.items = {...this.filterData};
    console.log(this.items, 'results found');
  }
  // Filter
  applyFilters(filters: Filter[]): void {
    this.items = [];
    if (filters && filters.length > 0) {
      this.users.forEach((item) => {
        if (this.matchesFilters(item, filters)) {
          this.items.push(item);
        }
      });
    } else {
      this.items = this.users;
    }
    this.toolbarConfig.filterConfig.resultsCount = this.items.length;
  }
  // Handle filter changes
  filterChanged($event: FilterEvent): void {
    this.filtersText = '';
    $event.appliedFilters.forEach((filter) => {
      this.filtersText += filter.field.title + ' : ' + filter.value + '\n';
    });
    this.applyFilters($event.appliedFilters);
  }
  matchesFilter(item: any, filter: Filter): boolean {
    let match = true;
    const re = new RegExp(filter.value, 'i');
    if (filter.field.id === 'name') {
      match = item.attributes.fullName.match(re) !== null;
    } else if (filter.field.id === 'email') {
      match = item.attributes.email.match(re) !== null;
    }
    return match;
  }
  matchesFilters(item: any, filters: Filter[]): boolean {
    let matches = true;
    filters.forEach((filter) => {
      if (!this.matchesFilter(item, filter)) {
        matches = false;
        return matches;
      }
    });
    return matches;
  }
  // Sort
  compare(item1: any, item2: any): number {
    let compValue = 0;
    if (this.currentSortField.id === 'name') {
      compValue = item1.attributes.fullName.localeCompare(item2.attributes.fullName, 'en', {
        sensitivity: 'base'
      });
    } else if (this.currentSortField.id === 'email') {
      compValue = item1.attributes.email.localeCompare(item2.attributes.email);
    }
    if (!this.isAscendingSort) {
      compValue = compValue * -1;
    }
    return compValue;
  }
  // Handle sort changes
  sortChanged($event: SortEvent): void {
    this.currentSortField = $event.field;
    console.log('currentSort Field', this.currentSortField);
    this.isAscendingSort = $event.isAscending;
    console.log('isAscebdong Field', this.isAscendingSort);
    this.items.sort((item1: any, item2: any) => this.compare(item1, item2));
  }
}
