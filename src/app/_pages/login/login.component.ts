import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }
  private oktaDomain = 'dev-07605005.okta.com';

  // oidc: {
  //   clientId: '0oajrkhoihpMyp74G5d6',
  //   issuer: `http://${oktaDomain}/oauth2/default`,
  //   redirectUri: 'http://localhost:4200/login/callback',
  //   scopes: ['openid', 'profile', 'email']
  // };

  ngOnInit(): void {
  }
}
