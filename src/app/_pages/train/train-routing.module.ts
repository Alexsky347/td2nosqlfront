import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './list/list.component';

const routes: Routes = [
  {
    path: '', component: ListComponent,
      // { path: 'add', component: AddEditComponent },
      // { path: 'edit/:id', component: AddEditComponent },
      // { path: 'details/:id', component: ProductDetailsComponent}
  }
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
