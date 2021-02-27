import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Train} from '../../../_models';
import {TrainService} from '../../../_services';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorHandlerService} from '../../../_services/error-handler.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-train-edit',
  templateUrl: './train-edit.component.html',
  styleUrls: ['./train-edit.component.css']
})
export  class TrainEditComponent implements OnInit {
  public train: Train;
  trainForm = this.fb.group({
    numTrain : [''],
    villeDepart : [''],
    villeArrivee : [''],
    heureDepart : ['']
  });
  public showAccounts;
  @Input() public owner: Train;
  public selectOptions = [{name: 'Show', value: 'show'}, {name: `Don't Show`, value: ''}];
  @Output() selectEmitt = new EventEmitter();
  constructor(private trainService: TrainService, private router: Router,
              private errorHandler: ErrorHandlerService, private activeRoute: ActivatedRoute, protected fb: FormBuilder) { }
  ngOnInit(): void {
    this.getTrain();
  }
  private getTrain(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.trainService.getTrain(id).subscribe(
      train => {
        this.train = train;
        this.getDataTrainForUpdate();
      });
  }
  public onChange = (event) => {
    this.selectEmitt.emit(event.value);
  }

 public getDataTrainForUpdate(): void {
    if (this.trainForm.get('id')){
      this.trainForm.get('id').setValue(this.train.numTrain);
    }
    if (this.trainForm.get('numTrain')){
      this.trainForm.get('numTrain').setValue(this.train.numTrain);
    }
    if (this.trainForm.get('villeDepart')){
      this.trainForm.get('villeDepart').setValue(this.train.villeDepart);
    }
    if (this.trainForm.get('villeArrivee')){
      this.trainForm.get('villeArrivee').setValue(this.train.villeArrivee);
    }
    if (this.trainForm.get('heureDepart')){
      this.trainForm.get('heureDepart').setValue(this.train.heureDepart);
    }
  }
  protected getTrainFromControl(): Train {
    return {
      id: this.trainForm.get('numTrain').value,
      numTrain: this.trainForm.get('numTrain').value,
      villeDepart: this.trainForm.get('villeDepart').value,
      villeArrivee: this.trainForm.get('villeArrivee').value,
      heureDepart: this.trainForm.get('heureDepart').value
    };
  }

  onSubmitForm(): void{
    this.validateForm();
  }
  validateForm(): void {
    this.trainService.editTrain(this.getTrainFromControl(), this.train.numTrain).subscribe(
      data => {
        console.log('train modifié:', data);
      },
      error => {
        console.log('train non modifié', error);
      }
    );
  }
}
