import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './list/list.component';
import {TrainEditComponent} from './train-edit/train-edit.component';
import {TrainAddComponent} from './train-add/train-add.component';
import {TrainDetailsComponent} from './train-details/train-details.component';
import {ReservationComponent} from './reservation/reservation.component';
import {ReservationListComponent} from './reservation-list/reservation-list.component';

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'add', component: TrainAddComponent},
  {path: 'edit/:id', component: TrainEditComponent },
  {path: 'details/:id', component: TrainDetailsComponent},
  {path: 'addReservation', component: ReservationComponent},
  {path: 'listReservation', component: ReservationListComponent}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class TrainRoutingModule { }
