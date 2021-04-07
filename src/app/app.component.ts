import {Component, OnInit} from '@angular/core';
import {User} from './_models/user';
import {AuthService} from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  title = 'front';
  user: User;
  screenWidth: number;
  isUser = true;

  constructor(private authService: AuthService) {
    this.authService.user.subscribe(x => this.user = x);
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
  }
  ngOnInit(): void {
    // this.user ? this.isUser = true : this.isUser = false;
  }

  logout = () => {
    this.authService.logout();
  }
}
