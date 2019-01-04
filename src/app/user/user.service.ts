import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from './models/user';
import {environment} from '../../environments/environment';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {VoteModel} from '../rooms/models/vote';

export class Token {
  id: string;
  createdAt: string;
  ttl: number;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public token: Token;
  private _user$: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);

  get user$() {
    return this._user$;
  }

  constructor(private http: HttpClient) {
    this.getUser();
  }

  login(userMod: UserModel) {
    return this.http.post<Token>(environment.apiUrl + 'users/login', userMod)
      .pipe(
        switchMap(token => {
          this.token = token;
          return this.http.get<UserModel>(environment.apiUrl + 'users/' + token.userId + '/?access_token=' + token.id).pipe(
            map(user => {
              if (user) {
                user.token = token.id;
                console.log(user);
                localStorage.setItem('currentUser', JSON.stringify(user));
                this._user$.next(user);
              }
            })
          );
        }),
        catchError(err => {
          if (err !== undefined) {
            // get nested error
            return throwError(err.error ? err.error.error : {code: 'error', message: 'error occurred'});
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this._user$.next(null);
  }

  register(user: UserModel) {
    return this.http.post(environment.apiUrl + 'users', user).pipe(
    );
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      this._user$.next(user);
    }
  }

  isLogged(): boolean {
    if (this.user$.getValue() !== undefined && this.user$.getValue() !== null) {
      return true;
    } else {
      return false;
    }
  }

  getUserVote() {
    return this.http.get<VoteModel[]>(environment.apiUrl + 'users/' + this.user$.getValue().id + '/votes').pipe();
  }

}
