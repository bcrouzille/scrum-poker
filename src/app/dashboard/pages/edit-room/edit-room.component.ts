import { Component, OnInit } from '@angular/core';
import {RoomModel} from '../../models/room';
import {RoomService} from '../../room.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.sass']
})

export class EditRoomComponent implements OnInit {
public  room: RoomModel = new RoomModel();
  constructor(private roomService: RoomService, private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
   this.getRoom();
  }

  getRoom() {
    const id = +this.route.snapshot.paramMap.get('idRoom');
    this.roomService.getRoom(id).subscribe(
      (room) => {
        this.room = room;
      }
    );
  }
    updateRoom() {
      this.roomService.updateRoom(this.room).subscribe(
        () => {
          this.router.navigateByUrl('/dashboard');
        }
      );
    }



}
