import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent implements OnInit {
  actionBtn: string = 'Submit';
  categoryForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<CategoryDialogComponent>, @Inject(MAT_DIALOG_DATA) public editData: any, private categoryService: CategoryService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(6)]]
    })

    if (this.editData) {
      this.actionBtn = 'Update'
      this.categoryForm.controls['title'].setValue(this.editData.title);
      this.categoryForm.controls['description'].setValue(this.editData.description);
    }
  }

  addCategory() {
    this.categoryService.addCategory(this.categoryForm.value).subscribe(res => {
      console.log(res);
      this.categoryForm.reset();
      this.dialogRef.close('save');
      swal.fire('Success', 'New Category added successfully!', 'success');
    }, error => {
      console.log(error);
      this.toastrService.error("Please try again later...", "Something went wrong!!", {
        timeOut: 2000,
        positionClass: 'top-right',
        progressBar: true
      });
    })
  }

  updateCategory() {
    this.categoryService.updateCategory(this.categoryForm.value, this.editData.cid).subscribe(res => {
      console.log(res);
      this.categoryForm.reset();
      this.dialogRef.close('update');
      swal.fire('Success', 'Category updated successfully!', 'success');
    }, error => {
      console.log(error);
      this.toastrService.error("Please try again later...", "Something went wrong!!", {
        timeOut: 2000,
        positionClass: 'top-right',
        progressBar: true
      });
    })
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      if (!this.editData) {
        this.addCategory();
      } else {
        this.updateCategory();
      }
    }
  }

}
