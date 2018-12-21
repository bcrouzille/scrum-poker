import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {RoomModel} from './models/room';
import {environment} from '../../environments/environment';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})

export class RoomService implements  OnInit {
  constructor(private http: HttpClient, private  userService: UserService) {

  }
  private _userId;
 // private _roomList$: BehaviorSubject<RoomModel[]> = new BehaviorSubject<RoomModel[]>(null);

  /*get roomList$() {
    return this._roomList$;
  }*/

  createRoom(newRoom: RoomModel) {
    newRoom.id_user = this._userId;
    return this.http.post(environment.apiUrl + 'rooms', newRoom).pipe(
      this.getRooms
    );
  }

  getRooms() {
    return this.http.get(environment.apiUrl + 'rooms');
  }

  ngOnInit(): void {
    this._userId =  JSON.parse(localStorage.getItem('currentUser')).id;
  }

}
