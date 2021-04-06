import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../_services/account.service';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {User} from '../../_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user: User;


  constructor(private accountService: AccountService) {

  }

}
