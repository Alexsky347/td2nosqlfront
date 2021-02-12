import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Train} from '../../../_models';
import {TrainService} from '../../../_services';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorHandlerService} from '../../../_services/error-handler.service';

@Component({
  selector: 'app-train-edit',
  templateUrl: './train-edit.component.html',
  styleUrls: ['./train-edit.component.css']
})
export class TrainEditComponent implements OnInit {
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
  public saveData(){

  }

}
