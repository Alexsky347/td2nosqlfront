import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AccountService} from '../../../_services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }
  public logout = () => {
    this.accountService.logout();
  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
