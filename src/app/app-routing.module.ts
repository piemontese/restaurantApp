import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { TableDetailComponent } from './components/home/table-detail/table-detail.component';
import { AdminComponent } from './components/admin/admin.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent,
    children: []
  },
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'table-detail/:id', component: TableDetailComponent }
    ]
  },
  {
    path: 'admin', component: AdminComponent,
    children: [
//      { path: 'dashboard', component: DashboardComponent }
    ]
  },
  {
    path: 'about', component: AboutComponent,
    children: []
  },
  {
    path: 'login', component: LoginComponent,
    children: []
  },
  {
    path: '**', component: PageNotFoundComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
