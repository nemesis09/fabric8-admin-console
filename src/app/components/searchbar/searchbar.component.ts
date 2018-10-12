import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  @Output() searched = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSearch(searchValue: string = null) {
    if (searchValue != null) {
      console.log('(in search Component) SUCCESS: recieved user ', searchValue);
      this.searched.emit(searchValue);
    } else {
      console.log('(in app Component) ERROR: username not recieved from search component ', searchValue);
    }
  }

}
