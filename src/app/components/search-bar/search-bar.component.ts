import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  @Output() search = new EventEmitter();

  handleSearch(searchTerm): void {
    this.search.emit(searchTerm);
  }

}
