import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {RoomModel} from './models/room';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {UserModel} from '../user/models/user';

@Injectable({
  providedIn: 'root'
})

export class RoomService implements  OnInit {
  constructor(private http: HttpClient) {
    this._userId = JSON.parse(localStorage.getItem('currentUser')).id;
    this._urlRooms$ = 'users/' + this._userId + '/rooms';
  }

  _userId;
  currentUser: UserModel;
  private _roomList$: BehaviorSubject<RoomModel[]> = new BehaviorSubject<RoomModel[]>(null);
  _urlRooms$;


  get roomList$() {
    return this._roomList$;
  }

  createRoom(newRoom: RoomModel) {
    console.log(this._userId);
    return this.http.post(environment.apiUrl + 'users/' + this._userId + '/rooms', newRoom).pipe(
    );
  }

  deleteRoom(idRoom) {
    return this.http.delete(environment.apiUrl + 'rooms/' + idRoom).pipe(
    );
  }

  getRooms() {
    return this.http.get<RoomModel[]>(environment.apiUrl + this._urlRooms$).pipe(
      map((rooms: RoomModel[]) => {
        console.log(rooms);
        this._roomList$.next(rooms);
      })
    );
  }

  getRoom(idRoom) {
    return this.http.get<RoomModel>(environment.apiUrl + 'rooms/' + idRoom).pipe();
  }

  updateRoom(room: RoomModel) {
    return this.http.patch(environment.apiUrl + '/rooms', room).pipe();
  }
  ngOnInit(): void {
  }

}
