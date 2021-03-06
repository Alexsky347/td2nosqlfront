import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AuthService} from '../../../_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged = false;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe((result) => this.isLogged = result);
  }

  public logout = () => {
    this.authService.logout();
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }


}
