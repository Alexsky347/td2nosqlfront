import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from '../../_components/layout/layout.component';
import {HomeComponent} from './home.component';
import {CreateComponent} from './create/create.component';
import {UpdateComponent} from './update/update.component';
import {CommonModule} from '@angular/common';
import {AuthGuard} from '../../_helpers';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
      { path: 'update', component: UpdateComponent, canActivate: [AuthGuard] },
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
