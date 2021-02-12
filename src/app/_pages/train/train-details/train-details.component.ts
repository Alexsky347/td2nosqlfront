import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Train} from '../../../_models';
import {ErrorHandlerService} from '../../../_services/error-handler.service';
import {TrainService} from '../../../_services';
import {ActivatedRoute, Router} from '@angular/router';



@Component({
  selector: 'app-train-details',
  templateUrl: './train-details.component.html',
  styleUrls: ['./train-details.component.css']
})
export class TrainDetailsComponent implements OnInit {
  public product: Train;
  public showAccounts;
  @Input() public owner: Train;
  public selectOptions = [{name: 'Show', value: 'show'}, {name: `Don't Show`, value: ''}];
  @Output() selectEmitt = new EventEmitter();
  constructor(private trainService: TrainService, private router: Router,
              private errorHandler: ErrorHandlerService, private activeRoute: ActivatedRoute) { }
  ngOnInit() {
    this.getDetails();
  }
  private getDetails = () => {
    const id: string = this.activeRoute.snapshot.params.id;

    this.trainService.getOne(id)
      .subscribe(res => {
          this.product = res as Train;
        },
        (error) => {
          this.errorHandler.handleError(error);
        });
  }
  public onChange = (event) => {
    this.selectEmitt.emit(event.value);
  }
}


