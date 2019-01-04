import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailRoomComponent } from './detail-room/detail-room.component';
import {CreateRoomComponent} from '../rooms/create-room/create-room.component';
import {EditRoomComponent} from '../rooms/edit-room/edit-room.component';
import {VoteComponent} from './vote/vote.component';
import {AppRoutingModule} from '../app-routing.module';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [DetailRoomComponent, CreateRoomComponent, EditRoomComponent, VoteComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
    FormsModule
  ]
})
export class RoomsModule { }
