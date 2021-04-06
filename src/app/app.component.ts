import {Component, OnInit} from '@angular/core';
import {AccountService} from './_services/account.service';
import {User} from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'front';
  user: User;
  screenWidth: number;
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  isUser = false;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
  }
  ngOnInit(): void {
    this.user ? this.isUser = true : this.isUser = false;
  }

  logout = () => {
    this.accountService.logout();
  }
}
