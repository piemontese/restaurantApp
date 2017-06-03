import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainToolbarComponent } from './components/common/main-toolbar/main-toolbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { TableDetailComponent } from './components/home/table-detail/table-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DataService } from "./services/data.service";
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    MainToolbarComponent,
    HomeComponent,
    LoginComponent,
    AboutComponent,
    TableDetailComponent,
    PageNotFoundComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  /*
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  */
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
