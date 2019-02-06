import { Component, Output, EventEmitter} from '@angular/core';
@Component({
  selector: 'app-pfn-toolbar',
  templateUrl: './pfn-toolbar.component.html',
  styleUrls: ['./pfn-toolbar.component.css']
})
export class PfnToolbarComponent {
  @Output() filterData = new EventEmitter();
  @Output() sortData = new EventEmitter();
  ascending: Boolean;

  handleFilter(searchTerm): void {
    this.filterData.emit(searchTerm);
  }

  handleSort(isAscending): void {
    this.sortData.emit(isAscending);
    this.ascending = !this.ascending;
  }

}
