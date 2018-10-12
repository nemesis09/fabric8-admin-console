import { Component, OnInit } from '@angular/core';
import { DataStore } from '../../services/data.store';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {

  public checkUserExist = false;
  constructor(
    private store: DataStore
  ) {
    store.users.subscribe(
      res => {
        if (res !== '' && res.length === 0) {
          this.checkUserExist = false;
        } else {
          this.checkUserExist = true;
        }
    });
  }

  ngOnInit() {
  }

}
