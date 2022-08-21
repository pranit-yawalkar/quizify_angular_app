import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.userService.isLoggedIn()) {
      if (this.userService.getUserRole() === 'ADMIN') {
        this.router.navigate(['admin']);
      } else if (this.userService.getUserRole() === 'NORMAL') {
        this.router.navigate(['user-dashboard']);
      }
      return false;
    }

    return true;
  }

}
