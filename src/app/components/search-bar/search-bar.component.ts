import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  constructor() {}
  @Output() search = new EventEmitter();

  ngOnInit() {
    console.log('Search-Bar.component.ts');
  }


  handleSearch(searchTerm): void {
    this.search.emit(searchTerm);
  }
}
