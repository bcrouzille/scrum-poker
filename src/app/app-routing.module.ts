import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from 'src/app/dashboard/pages/home/home.component';
import {RegisterComponent} from './user/components/register/register.component';
import {LoginComponent} from './user/components/login/login.component';

const routes: Routes = [
  { path: 'dashboard', component: HomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
