import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../models/user';
import {UserService} from '../../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  public user: UserModel = new UserModel();

  constructor(private userService: UserService, private router: Router) {
    this.user = new UserModel();
  }
  register() {
    this.userService.register(this.user).subscribe( retour => {
      this.router.navigateByUrl('/login');
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
