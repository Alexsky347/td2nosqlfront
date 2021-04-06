import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './_modules/material/material.module';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import { LoginComponent } from './_pages/login/login.component';
import { LayoutComponent } from './_components/layout/layout.component';
import {NotFoundComponent} from './_components/error-pages/not-found/not-found.component';
import {ServerErrorComponent} from './_components/error-pages/server-error/server-error.component';
import {SidenavListComponent} from './_components/navigation/sidenav-list/sidenav-list.component';
import {HeaderComponent} from './_components/navigation/header/header.component';
import { HomeComponent } from './_pages/home/home.component';
import {ErrorInterceptor, JwtInterceptor} from './_helpers';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import { CreateCitationComponent } from './_pages/create-citation/create-citation.component';

// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    HeaderComponent,
    SidenavListComponent,
    NotFoundComponent,
    ServerErrorComponent,
    HomeComponent,
    CreateCitationComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot(),
    FormsModule,
    Ng2SearchPipeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

