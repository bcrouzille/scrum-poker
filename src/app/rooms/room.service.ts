import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {RoomModel} from './models/room';
import {environment} from '../../environments/environment';
import {map, switchMap} from 'rxjs/operators';
import {UserModel} from '../user/models/user';
import {ItemModel} from './models/item';
import {UserService} from '../user/user.service';
import {VoteModel} from './models/vote';

@Injectable({
  providedIn: 'root'
})

export class RoomService implements OnInit {

  currentUser: UserModel;
  _room$: BehaviorSubject<RoomModel> = new BehaviorSubject<RoomModel>(null);
  _items$: BehaviorSubject<ItemModel[]> = new BehaviorSubject<ItemModel[]>(null);
  private _userId;
  private _urlRooms$: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.initialize();
  }

  private _roomList$: BehaviorSubject<RoomModel[]> = new BehaviorSubject<RoomModel[]>(null);

  get roomList$() {
    return this._roomList$;
  }

  createRoom(newRoom: RoomModel) {
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
        this._roomList$.next(rooms);
      })
    );
  }

  getRoom(idRoom) {
    return this.http.get<RoomModel>(environment.apiUrl + 'rooms/' + idRoom).pipe(
      switchMap(room => {
          this._room$.next(room);
          return this.http.get<ItemModel[]>(environment.apiUrl + 'rooms/' + idRoom + '/items').pipe(
            map(items => this._items$.next(items)));
      }
      ));
  }

  updateRoom(room: RoomModel) {
    return this.http.patch<RoomModel>(environment.apiUrl + 'rooms/', room).pipe();
  }

  getItems(idRoom) {
    return this.http.get<ItemModel[]>(environment.apiUrl + 'rooms/' + idRoom + '/items').pipe(
      map(items => this._items$.next(items))
    );
  }

  addItems(items: ItemModel[], idRoom) {
    return this.http.post(environment.apiUrl + 'rooms/' + idRoom + '/items', items).pipe();
  }

  deleteItem(itemId) {
    return this.http.delete(environment.apiUrl + 'items/' + itemId).pipe();
  }

  updateItem(item: ItemModel) {
    return this.http.patch(environment.apiUrl + 'items/', item).pipe();
  }

  clearItems(idRoom) {
    return this.http.delete(environment.apiUrl + 'rooms/' + idRoom + '/items').pipe();
  }

  addVote(vote: VoteModel) {
    return this.http.post<VoteModel>(environment.apiUrl + 'users/' + this.currentUser.id + '/votes/', vote).pipe(
      switchMap(retour => {
        console.log(retour);
        return this.http.put(environment.apiUrl + 'items/' + vote.itemsId + '/votes/rel/' + retour.id, null).pipe();
      }
    ));
  }

  editVote(vote: VoteModel){
    return this.http.patch(environment.apiUrl + 'votes/' + vote.id, vote).pipe();
  }

  getVotes(idItem) {
    return this.http.get<VoteModel[]>(environment.apiUrl + 'items/' + idItem + '/votes/').pipe();
}

  initialize() {
    this.userService.user$.subscribe(user => {
      if (user) {this._userId = user.id} else {this._userId = null};
      this.currentUser = user;
      this._urlRooms$ = 'users/' + this._userId + '/rooms';

    });
  }

  ngOnInit(): void {
  }

}