import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryDialogComponent } from 'src/app/components/category-dialog/category-dialog.component';
import { CategoryService } from 'src/app/services/category.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories!: any;

  constructor(private categoryService: CategoryService, private dialog: MatDialog, private router: Router, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res;
      this.categories.reverse();
      console.log(res);
    }, error => {
      console.log(error);
    })
  }

  addCategory() {
    this.dialog.open(CategoryDialogComponent, {
      width: "500px"
    }).afterClosed().subscribe(res => {
      if (res === 'save') {
        this.getAllCategories();
      }
    })
  }

  updateCategory(category: any): void {
    this.dialog.open(CategoryDialogComponent, {
      width: '500px',
      data: category
    }).afterClosed().subscribe(res => {
      if (res === 'update') {
        this.getAllCategories();
      }
    })
  }

  deleteCategory(category: any): void {
    swal.fire({
      icon: 'warning',
      title: 'Do you really want to delete this category?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((res) => {
      if (res.isConfirmed) {
        this.categoryService.deleteCategory(category.cid).subscribe(response => {
          swal.fire('Success', 'Category deleted successfully!', 'success');
          this.reloadComponent();
        }, error => {
          this.toastrService.error("Please try again later...", "Something went wrong!!", {
            timeOut: 2000,
            positionClass: 'top-right',
            progressBar: true
          });
        })
      }
    })
  }
}
