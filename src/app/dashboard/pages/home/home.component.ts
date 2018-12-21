import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import {UserModel} from '../../../user/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  currentUser: UserModel;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
