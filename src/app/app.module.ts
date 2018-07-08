import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
// import { MaterialModule } from '@angular/material'
import { FlexLayoutModule } from '@angular/flex-layout';
// import { CdkTableModule } from '@angular/cdk'
import { MdDialogModule, MdButtonModule, MdCardModule, MdInputModule } from '@angular/material';
import { MdToolbarModule, MdSlideToggleModule, MdTableModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainToolbarComponent } from './components/common/main-toolbar/main-toolbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { TableDetailComponent } from './components/home/table-detail/table-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DataService } from './services/data.service';
import { AdminComponent } from './components/admin/admin.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { ConfirmDialogComponent } from './components/common/confirm-dialog/confirm-dialog.component';
import { DialogService } from './services/dialog.service';
import { DetailDialogComponent } from './components/common/detail-dialog/detail-dialog.component';
import { DetailDialogService } from './services/detail-dialog.service';
import { MessageBoxComponent } from './components/common/message-box/message-box.component';
import { MessageBoxService } from './services/message-box.service';

@NgModule({
  declarations: [
    AppComponent,
    MainToolbarComponent,
    HomeComponent,
    LoginComponent,
    AboutComponent,
    TableDetailComponent,
    PageNotFoundComponent,
    AdminComponent,
    AdminUsersComponent,
    ConfirmDialogComponent,
    DetailDialogComponent,
    MessageBoxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
//    MaterialModule,
    FlexLayoutModule,
//    CdkTableModule,
    MdDialogModule,
    MdToolbarModule,
    MdSlideToggleModule,
    MdTableModule,
    MdCardModule,
    MdButtonModule,
    MdInputModule,
    MdIconModule,
    AppRoutingModule
  ],
  exports: [
    ConfirmDialogComponent,
    DetailDialogComponent,
/*
    CommonModule,
    FormsModule,
    ReactiveFormsModule
*/
  ],
  providers: [
    DataService,
    MessageBoxService,
    DialogService,
    DetailDialogService
  ],
  entryComponents: [
    ConfirmDialogComponent,
    MessageBoxComponent,
    DetailDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
