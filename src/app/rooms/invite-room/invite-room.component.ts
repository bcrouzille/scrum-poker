import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../user/user.service';
import {UserModel} from '../../user/models/user';
import {RoomService} from '../room.service';
import {RoomModel} from '../models/room';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-invite-room',
  templateUrl: './invite-room.component.html',
  styleUrls: ['./invite-room.component.sass']
})
export class InviteRoomComponent implements OnInit {

  private _room: RoomModel = new RoomModel();
  private _usersInvited: UserModel[] = [];
  private _userNotInvited: UserModel[] = [];

  constructor(private userService: UserService, private roomService: RoomService, private route: ActivatedRoute) {

  }

  inviteUser(user: UserModel) {
    this._usersInvited.push(user);
    this._userNotInvited.splice(this._userNotInvited.indexOf(user), 1 );
    this.userService.addUserToRoom(user.id, this._room.id).subscribe();
  }

  deleteUser(user: UserModel) {
    this._userNotInvited.push(user);
    this._usersInvited.splice(this._userNotInvited.indexOf(user), 1);
    this.userService.deleteUserFromRoom(user.id, this._room.id).subscribe();
  }

  getRoom() {
    this.roomService.getSimpleRoom(this.route.snapshot.paramMap.get('idRoom')).subscribe(
      (room) => {
        this._room = room;
        if (room) {
          this.getAllUsers();
        }
      }
    );
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (users) => {
        if (users) {
          users.forEach(u => {
            if (u.id !== this.userService.user$.getValue().id) {
              this.roomService.usersBelongToRoom(u.id, this._room.id).subscribe(
                (retour) => {
                  this._usersInvited.push(u);
                },
                (err) => {
                  this._userNotInvited.push(u);
                }
              );
            }
          });
        }
      }
    );
  }

  ngOnInit() {
    this.getRoom();
  }
}
