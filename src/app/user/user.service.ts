import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from './models/user';
import {environment} from '../../environments/environment';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';

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

  }

  login(userMod: UserModel) {
    return this.http.post<Token>(environment.apiUrl + 'users/login', userMod)
      .pipe(
        switchMap(token => {
         console.log(token)
          this.token = token;
        return this.http.get<UserModel>(environment.apiUrl + 'users/' + token.userId + '/?access_token=' + token.id);
        }),
        catchError(err => {
          console.log(err)
          if (err !== undefined) {
          // get nested error
          return throwError(err.error ? err.error.error : {code: 'error', message: 'error occurred'});
          }
        }),
        tap(user => {
          this._user$.next(user);
        })
        );
  }

  register(user: UserModel) {
    return this.http.post(environment.apiUrl + 'users', user).pipe(
    );
  }
}
