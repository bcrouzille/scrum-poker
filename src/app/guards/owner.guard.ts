import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../user/user.service';
import {RoomService} from '../rooms/room.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerGuard implements CanActivate {

  private idRoom$;

  constructor(private userService: UserService, private  roomService: RoomService, private  router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.idRoom$ = +next.paramMap.get('idRoom');
    return this.checkOwner();
  }

  // check if the current user is room's owner
  checkOwner(): boolean {
    if (this.checkLogin()) {
      return this.isOwner();
    }
    return false;
  }

  checkLogin(): boolean {
    if (this.userService.isLogged()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  isOwner(): boolean {
    const roomList = this.roomService.roomList$.getValue();
    let isOwner = false;
    if (roomList) {
      roomList.forEach(room => {
        if (room.id === this.idRoom$) {
          isOwner = true;
        }
      });
    }
    if (!isOwner) {
      this.router.navigateByUrl('/dashboard');
    }
    return isOwner;
  }
}
