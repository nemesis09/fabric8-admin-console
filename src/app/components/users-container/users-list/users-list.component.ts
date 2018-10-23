import { Component, OnInit, Input } from '@angular/core';
import { User } from 'ngx-login-client';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  @Input() users: User[];

  ngOnInit() {
  }

}
