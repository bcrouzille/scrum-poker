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
  public _userRoomList$: RoomModel[];
  public _otherRoomList$: RoomModel[];

  constructor(private userService: UserService, private roomService: RoomService) {
    this._otherRoomList$ = [];
    this._userRoomList$ = [];
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.refreshRooms();
  }

  refreshRooms() {
    this.roomService.getRooms().subscribe(() => {
      this._roomList$ = this.roomService.roomList$.getValue();
      if (this._roomList$) {
        this._roomList$.forEach(r => {
          if (r.owner === this.currentUser.id) {
            this._userRoomList$.push(r);
          } else {
            this._otherRoomList$.push(r);
          }
        });
      }
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
