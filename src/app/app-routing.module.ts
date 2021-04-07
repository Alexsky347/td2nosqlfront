import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from './_components/error-pages/not-found/not-found.component';
import {ServerErrorComponent} from './_components/error-pages/server-error/server-error.component';
import {LoginComponent} from './_pages/login/login.component';
import {HomeComponent} from './_pages/home/home.component';
import {CreateCitationComponent} from './_pages/create-citation/create-citation.component';
import {RegisterComponent} from './_pages/register/register.component';
import {DetailCitationComponent} from './_pages/detail-citation/detail-citation.component';
import {AuthGuard} from './_helpers';

const homeModule = () => import('./_pages/home/home.module').then(x => x.HomeModule);
const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'add', component: CreateCitationComponent, canActivate: [AuthGuard] },
  { path: 'detail-citation/:id', component: DetailCitationComponent},
  { path: '404', component: NotFoundComponent},
  { path: '500', component: ServerErrorComponent },

  // otherwise redirect to home
  // { path: '**', redirectTo: '', pathMatch: 'full' },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
