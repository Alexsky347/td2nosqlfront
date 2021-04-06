import {AfterViewInit, Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';
import {AccountService} from '../../_services/account.service';
import {User} from '../../_models/user';
import {CitationService} from '../../_services';
import {Router} from '@angular/router';
import {Citation} from '../../_models/citation';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  user: User;
  citation: any;
  myControl = new FormControl();
  constructor(
    private accountService: AccountService,
    private citationService: CitationService,
    private router: Router
  ) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.getAll();
  }

  public getAll = () => {
    this.citationService.getAll()
      .subscribe(data => {
          this.citation = data;
        },
        (error) => {
          console.log(error.message);
        });
  }
}
