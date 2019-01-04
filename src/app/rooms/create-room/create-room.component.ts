import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RoomService} from '../room.service';
import {RoomModel} from '../models/room';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.sass']
})
export class CreateRoomComponent implements OnInit {
  public newRoom: RoomModel = new RoomModel();


  constructor(private roomService: RoomService, private router: Router) {
    this.newRoom = new RoomModel();
  }

  createRoom() {
    this.roomService.createRoom(this.newRoom).subscribe(
      () => {
        this.router.navigateByUrl('/dashboard');
      }
    );
  }

  ngOnInit() {
  }

}
