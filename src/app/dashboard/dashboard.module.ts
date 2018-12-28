import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './pages/home/home.component';
import {CreateRoomComponent} from './pages/create-room/create-room.component';
import {FormsModule} from '@angular/forms';
import {EditRoomComponent} from './pages/edit-room/edit-room.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  declarations: [HomeComponent, CreateRoomComponent, EditRoomComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
    FormsModule
  ],
})

export class DashboardModule { }
