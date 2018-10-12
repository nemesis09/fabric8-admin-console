import { Component, OnInit } from '@angular/core';
import { UserSearchService } from '../../services/user-search.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  constructor(
    private userSearch: UserSearchService) { }

searchingUsers(username: string = null) {
  console.log('(in search Component) calling user-search service with username ', username);
  this.userSearch.getusers(username);
}

  ngOnInit() {
  }

}
