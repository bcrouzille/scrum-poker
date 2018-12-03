import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UserModel} from './models/user';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public connectedUser: UserModel;

  constructor(private http: HttpClient) {
  }

  login(user: UserModel) {
    return this.http.post(environment.apiUrl + 'users/login', user);
  }

  register(user: UserModel) {
    return this.http.post(environment.apiUrl + 'users', user).pipe(
    );
  }
}
