import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {
  categories: any;
  isLoggedIn: boolean = false;
  user: any = null;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private categoryService: CategoryService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.getCateogories();
  }

  getCateogories() {
    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res;
    }, error => {
      console.log(error);
    })
  }

}
