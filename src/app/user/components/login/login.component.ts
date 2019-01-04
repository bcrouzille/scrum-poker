import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/user/user.service';
import {UserModel} from '../../models/user';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public user: UserModel = new UserModel();
  private error = '';
//
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
          console.log(error.message)
        this.error = error.message;
      },
      () => {
        console.log('complete');
      }
    );
  }

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      if (user) {
      this.user = user;
      /*console.log(this.user);
      if (this.user.token !== undefined && this.user !== null && this.user.token !== '') {
        this.router.navigateByUrl('/dashboard');
      }*/
    }});
  }

}
