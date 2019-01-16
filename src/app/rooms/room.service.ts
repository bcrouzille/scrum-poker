import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, throwError} from 'rxjs';
import {RoomModel} from './models/room';
import {environment} from '../../environments/environment';
import {catchError, map, switchMap} from 'rxjs/operators';
import {UserModel} from '../user/models/user';
import {ItemModel} from './models/item';
import {UserService} from '../user/user.service';
import {VoteModel} from './models/vote';
import {QueryEncoder} from '@angular/http';

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
    newRoom.owner = this.currentUser.id;
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

  getSimpleRoom(idRoom) {
    const options = {params: new HttpParams().set('filter', '{"include":"users"}')};
    return this.http.get<RoomModel>(environment.apiUrl + 'rooms/' + idRoom, options).pipe();
  }

  getRoom(idRoom) {
    const options = {params: new HttpParams().set('filter', '{"include":"items"}')};
    return this.http.get<RoomModel>(environment.apiUrl + 'rooms/' + idRoom, options).pipe(
      map(room => {
          this._room$.next(room);
      }
      ));
  }


  getRoomWithVotes(idRoom) {
    const options = {params: new HttpParams().set('filter', '{"include":{"relation": "items", "scope":{"include":{"relation":"votes"}}}}')};
    return this.http.get<RoomModel>(environment.apiUrl + 'rooms/' + idRoom, options).pipe(
      map(room => {
          this._room$.next(room);
        }
      ));
  }

  updateRoom(room: RoomModel) {
    return this.http.patch<RoomModel>(environment.apiUrl + 'rooms/', room).pipe();
  }

/*  getItems(idRoom) {
    return this.http.get<ItemModel[]>(environment.apiUrl + 'rooms/' + idRoom + '/items').pipe(
      map(items => this._items$.next(items))
    );
  }*/

  addItems(items: ItemModel[], idRoom) {
    return this.http.post(environment.apiUrl + 'rooms/' + idRoom + '/items', items).pipe();
  }

  deleteItem(itemId) {
    return this.http.delete(environment.apiUrl + 'items/' + itemId + '/votes').pipe(
      switchMap( () => {
        return this.http.delete(environment.apiUrl + 'items/' + itemId).pipe();
      })
    );
  }

  updateItem(item: ItemModel) {
    return this.http.patch(environment.apiUrl + 'items/', item).pipe();
  }

  clearItems(idRoom) {
    return this.http.delete(environment.apiUrl + 'rooms/' + idRoom + '/items').pipe();
  }

  addVote(vote: VoteModel) {
    vote.username = this.userService.user$.getValue().username;
    return this.http.post<VoteModel>(environment.apiUrl + 'users/' + this.currentUser.id + '/votes/', vote).pipe(
      switchMap(retour => {
        return this.http.put(environment.apiUrl + 'items/' + vote.itemsId + '/votes/rel/' + retour.id, null).pipe();
      }
    ));
  }

  editVote(vote: VoteModel) {
    return this.http.patch(environment.apiUrl + 'votes/' + vote.id, vote).pipe();
  }

  deleteVote(vote: VoteModel) {
    return this.http.delete(environment.apiUrl + 'votes/' + vote.id).pipe();
  }

  getVotes(idItem) {
    return this.http.get<VoteModel[]>(environment.apiUrl + 'items/' + idItem + '/votes/').pipe();
}

  usersBelongToRoom(idUser, idRoom) {
    return this.http.get(environment.apiUrl + 'users/' + idUser + '/rooms/' + idRoom).pipe(
      map(() => {
        return true;
      },
        catchError(err => {
          return throwError(err.error ? err.error.error : {code: 'error', message: 'error occurred'});

        })));
  }

  closeVotes(itemId, closed: boolean) {
    return this.http.patch(environment.apiUrl + 'items/' + itemId, {'isClosed': closed}).pipe();
  }

  resetVotes(itemId) {
    return this.http.delete(environment.apiUrl + 'items/' + itemId + '/votes').pipe(
    );
  }


  initialize() {
    this.userService.user$.subscribe(user => {
      if (user) {
        this._userId = user.id;
      } else {
        this._userId = null;
      }
      this.currentUser = user;
      this._urlRooms$ = 'users/' + this._userId + '/rooms';

    });
  }

  ngOnInit(): void {
  }

}
