import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/user/user.service';
import {UserModel} from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public user: UserModel = new UserModel();
  public msgError: string;

  constructor(private userService: UserService) {

  }

  login() {
    this.msgError = '';
    this.userService.login(this.user).subscribe(
      retour => {
        console.log(retour);
      },
      (error) => {
        console.log(error);
        this.msgError = error.error.error.message;
      },
      () => {
        console.log('complete');
      }
    );
  }

  ngOnInit() {
  }

}
