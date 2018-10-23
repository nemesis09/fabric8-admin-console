import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() loggedInUser;
  @Output() logoutClick = new EventEmitter();

  ngOnInit() {
  }

  handleLogoutClick(): void {
    this.logoutClick.emit();
  }

}
