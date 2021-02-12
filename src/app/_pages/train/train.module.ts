import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainRoutingModule } from './train-routing.module';
import { ListComponent } from './list/list.component';
import {MaterialModule} from '../../_modules/material/material.module';
import { TrainDetailsComponent } from './train-details/train-details.component';
import { TrainAddComponent } from './train-add/train-add.component';
import { TrainEditComponent } from './train-edit/train-edit.component';



@NgModule({
  declarations: [ListComponent, TrainDetailsComponent, TrainAddComponent, TrainEditComponent],
  imports: [
    CommonModule,
    TrainRoutingModule,
    MaterialModule
  ]
})
export class TrainModule { }
