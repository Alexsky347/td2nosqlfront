import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from '../../_components/layout/layout.component';
import {HomeComponent} from './home.component';
import {CommonModule} from '@angular/common';
import {AuthGuard} from '../../_helpers';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})



export class HomeRoutingModule { }
