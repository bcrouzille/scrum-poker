import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from 'src/app/dashboard/pages/home/home.component';
import {RegisterComponent} from './user/components/register/register.component';
import {LoginComponent} from './user/components/login/login.component';
import {LogoutComponent} from './user/components/logout/logout.component';
import {CreateRoomComponent} from './rooms/create-room/create-room.component';
import {EditRoomComponent} from './rooms/edit-room/edit-room.component';
import {AuthGuard} from './guards/auth.guard';
import {UnauthGuard} from './guards/unauth.guard';
import {OwnerGuard} from './guards/owner.guard';
import {DetailRoomComponent} from './rooms/detail-room/detail-room.component';
import {InviteRoomComponent} from './rooms/invite-room/invite-room.component';

const routes: Routes = [
  { path: 'dashboard', canActivate: [AuthGuard], component: HomeComponent},
  { path: 'detailRoom/:idRoom', canActivate: [AuthGuard], component: DetailRoomComponent},
  { path: 'editRoom/:idRoom', canActivate: [OwnerGuard], component: EditRoomComponent},
  { path: 'inviteRoom/:idRoom', canActivate: [OwnerGuard], component: InviteRoomComponent},
  { path: 'createRoom', canActivate: [AuthGuard], component: CreateRoomComponent},
  { path: 'register', canActivate: [UnauthGuard], component: RegisterComponent},
  { path: 'login', canActivate: [UnauthGuard], component: LoginComponent},
  { path: 'logout', canActivate: [AuthGuard], component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
