import {AfterContentInit, Component, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements OnInit, AfterContentInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

  }

  ngAfterContentInit(): void {
  }

  logout(){
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }


}
