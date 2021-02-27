import { Component, OnInit } from '@angular/core';
import {Train} from '../../../_models';
import {TrainService} from '../../../_services';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorHandlerService} from '../../../_services/error-handler.service';

@Component({
  selector: 'app-train-add',
  templateUrl: './train-add.component.html',
  styleUrls: ['./train-add.component.css']
})
export class TrainAddComponent implements OnInit {
  public train: Train;
  trainForm = this.fb.group({
    numTrain : [''],
    villeDepart : [''],
    villeArrivee : [''],
    heureDepart : ['']
  });
  constructor(private trainService: TrainService, private router: Router,
              private errorHandler: ErrorHandlerService, private activeRoute: ActivatedRoute, protected fb: FormBuilder) { }

  ngOnInit(): void {
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
    this.trainService.addTrain(this.getTrainFromControl()).subscribe(
      data => {
        console.log('train ajouté:', data);
      },
      error => {
        console.log('erreur lors de l\'ajout', error);
      }
    );
  }
}
