import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CreateRoomComponent } from './pages/create-room/create-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, CreateRoomComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class DashboardModule { }
