import { Component, OnInit } from '@angular/core';
import {BookTrain} from '../../../_models';
import {Train} from '../../../_models';
import {TrainService} from '../../../_services';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ErrorHandlerService} from '../../../_services/error-handler.service';
import {FormBuilder} from '@angular/forms';
import {BookTrainService} from '../../../_services/booktrain.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  public bookTrain: BookTrain;
  public train: any = [];
  public dataSource = new MatTableDataSource<Train>();
  bookTrainForm = this.fb.group({
    bookNumber : [''],
    currentTrain : [''],
    numberPlaces : [''],
  });
  constructor(private bookTrainService: BookTrainService, private router: Router, private toastr: ToastrService,
              private activeRoute: ActivatedRoute, protected fb: FormBuilder, private trainService: TrainService, ) { }
  ngOnInit(): void {
    this.trainService.getAll().subscribe(
      response => {
        this.train = response;
      });
  }
  protected getBookTrainFromControl(): BookTrain {
    return {
      id: this.bookTrainForm.get('bookNumber').value,
      bookNumber: this.bookTrainForm.get('bookNumber').value,
      currentTrain: this.bookTrainForm.get('currentTrain').value,
      numberPlaces: this.bookTrainForm.get('numberPlaces').value,
    };
  }
  onSubmitForm(): void{
    this.validateForm();
  }
  validateForm(): void {
    console.log(this.getBookTrainFromControl());
    this.bookTrainService.addBookTrain(this.getBookTrainFromControl()).subscribe(
      data => {
        this.toastr.success('Reservation enregistrée', 'Succès');
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 1000);
        console.log('Réservation ajouté:', data);
      },
      error => {
        this.toastr.error('Problème lors de la réservation du train', 'Erreur');
        console.log('erreur lors de la réservation', error);
      }
    );
  }
}
