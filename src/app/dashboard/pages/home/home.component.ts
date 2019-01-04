import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/user/user.service';
import {UserModel} from '../../../user/models/user';
import {RoomService} from '../../../rooms/room.service';
import {RoomModel} from '../../../rooms/models/room';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  currentUser: UserModel;
  public _roomList$: RoomModel[];

  constructor(private userService: UserService, private roomService: RoomService) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.refreshRooms();
  }

  refreshRooms() {
    this.roomService.getRooms().subscribe(() => {
      this._roomList$ = this.roomService.roomList$.getValue();
    });
  }

  deleteRoom(idRoom) {
    this.roomService.deleteRoom(idRoom).subscribe(
      () => {
        this.refreshRooms();
      }
    );
  }

}
