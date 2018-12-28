import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from 'src/app/dashboard/pages/home/home.component';
import {RegisterComponent} from './user/components/register/register.component';
import {LoginComponent} from './user/components/login/login.component';
import {LogoutComponent} from './user/components/logout/logout.component';
import {CreateRoomComponent} from './dashboard/pages/create-room/create-room.component';
import {EditRoomComponent} from './dashboard/pages/edit-room/edit-room.component';

const routes: Routes = [
  { path: 'dashboard', component: HomeComponent},
  {path: 'editRoom/:idRoom', component: EditRoomComponent},
  { path: 'createRoom', component: CreateRoomComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
