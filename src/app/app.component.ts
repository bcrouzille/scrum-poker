import {Component, OnInit} from '@angular/core';
import {UserModel} from './user/models/user';
import {UserService} from './user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  public user$: UserModel = new UserModel();


  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.user$ = user;
    });
  }


}
