import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  categories!: any;
  isLoggedIn: boolean = false;
  user: any = null;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public userService: UserService, private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.user = this.userService.getUser();
    this.userService.loginStatusSubject.asObservable().subscribe(data => {
      this.isLoggedIn = this.userService.isLoggedIn();
      this.user = this.userService.getUser();
    })
    this.getCateogories();
  }

  reloadComponent(currentUrl: string) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  public logout() {
    this.userService.logoutUser();
    this.userService.loginStatusSubject.next(false);
    this.reloadComponent("/login");
  }

  getCateogories() {
    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res;
    }, error => {
      console.log(error);
      this.logout();
    })
  }

}
