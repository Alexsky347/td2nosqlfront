import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from './_components/error-pages/not-found/not-found.component';
import {ServerErrorComponent} from './_components/error-pages/server-error/server-error.component';
import {LoginComponent} from './_pages/login/login.component';

const homeModule = () => import('./_pages/home/home.module').then(x => x.HomeModule);
const routes: Routes = [
  { path: 'lo', loadChildren: homeModule },
  { path: 'login', component: LoginComponent},
  { path: '404', component: NotFoundComponent},
  { path: '500', component: ServerErrorComponent },

  // otherwise redirect to home
  // { path: '**', redirectTo: '', pathMatch: 'full' },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  // { path: '**', redirectTo: '/404', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
