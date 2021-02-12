import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainRoutingModule } from './train-routing.module';
import { ListComponent } from './list/list.component';
import {MaterialModule} from '../../_modules/material/material.module';



@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    TrainRoutingModule,
    MaterialModule,

  ]
})
export class TrainModule { }
