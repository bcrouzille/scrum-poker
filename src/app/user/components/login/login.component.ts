import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/user/user.service';
import {UserModel} from '../../models/user';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  public user: UserModel = new UserModel();
  error: { message, code } = null;

    constructor(private userService: UserService, private router: Router) {
    this.user = new UserModel();
  }


  login() {
    this.userService.login(this.user)
      .subscribe(
        (user) => {
        this.router.navigateByUrl('/dashboard');
      },
      (error) => {
          console.log(error)
        this.error = error;
      },
      () => {
        console.log('complete');
      }
    );
  }

  ngOnInit() {
  }

}
