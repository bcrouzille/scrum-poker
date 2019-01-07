import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../models/user';
import {UserService} from '../../user.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  private error = '';
  public user: UserModel = new UserModel();

  constructor(private userService: UserService, private router: Router) {
    this.user = new UserModel();
  }
  register() {
    this.userService.register(this.user)
      .subscribe( () => {
      this.router.navigateByUrl('/login');
    },
      (error) => {
      this.error = error.message;
      },
        () => {
        console.log('register success');
        });
  }

  ngOnInit() {
  /*  this.userService.user$.subscribe(user => {
      if (user) {
      this.user = user;
      console.log(this.user);
      if (this.user.token !== undefined && this.user.token !== '') {
        this.router.navigateByUrl('/dashboard');}
      }
    });*/
  }

}
