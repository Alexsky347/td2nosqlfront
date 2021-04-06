import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {MaterialModule} from '../../_modules/material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class HomeModule { }
