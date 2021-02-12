import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListComponent} from './_pages/train/list/list.component';

// const trainModule = () => import('src/app/_pages/train/train.module').then(x => x.TrainModule);

const routes: Routes = [
  { path: '', component: ListComponent},

  // otherwise redirect to home
  // { path: '**', redirectTo: '', pathMatch: 'full' }
  // { path: '', redirectTo: '/', pathMatch: 'full' },
  // { path: '**', redirectTo: '/404', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
