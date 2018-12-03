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
  }

}
