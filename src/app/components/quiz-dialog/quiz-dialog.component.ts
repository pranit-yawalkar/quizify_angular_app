import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-dialog',
  templateUrl: './quiz-dialog.component.html',
  styleUrls: ['./quiz-dialog.component.css']
})
export class QuizDialogComponent implements OnInit {
  selectedCategory!: string | null;
  actionBtn: string = 'Submit';
  quizForm!: FormGroup;
  categories!: any;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<QuizDialogComponent>, @Inject(MAT_DIALOG_DATA) public editData: any, private quizService: QuizService, private categoryService: CategoryService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getCategories();


    this.quizForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(6)]],
      maxMarks: ['', Validators.required],
      numberOfQuestions: ['', Validators.required],
      active: ['', Validators.required],
      categoryId: ['', Validators.required]
    })

    if (this.editData) {
      this.actionBtn = 'Update'
      this.quizForm.controls['title'].setValue(this.editData.title);
      this.quizForm.controls['description'].setValue(this.editData.description);
      this.quizForm.controls['maxMarks'].setValue(this.editData.maxMarks);
      this.quizForm.controls['numberOfQuestions'].setValue(this.editData.numberOfQuestions);
      this.quizForm.controls['active'].setValue(this.editData.active);
      this.quizForm.controls['categoryId'].setValue(this.editData.category.cid);
    }
  }



  getCategories() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    }, error => {
      console.log(error);
    })
  }

  onSubmit() {
    if (this.quizForm.valid) {
      if (!this.editData) {
        this.addQuiz();
      } else {
        this.updateQuiz();
      }
    }
  }

  addQuiz() {
    this.quizService.addQuiz(this.quizForm.value).subscribe(res => {
      this.quizForm.reset();
      this.dialogRef.close('save');
      swal.fire('Success', 'New Quiz added successfully!', 'success');
    }, error => {
      console.log(error);
      this.toastrService.error("Please try again later...", "Something went wrong!!", {
        timeOut: 2000,
        positionClass: 'top-right',
        progressBar: true
      });
    })
  }

  updateQuiz() {
    this.quizService.updateQuiz(this.quizForm.value, this.editData.qid).subscribe(res => {
      this.quizForm.reset();
      this.dialogRef.close('update');
      swal.fire('Success', 'Quiz updated successfully!', 'success');
    }, error => {
      console.log(error);
      this.toastrService.error("Please try again later...", "Something went wrong!!", {
        timeOut: 2000,
        positionClass: 'top-right',
        progressBar: true
      });
    })
  }

}
