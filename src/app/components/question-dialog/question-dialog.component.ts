import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/Question';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import { QuizDialogComponent } from '../quiz-dialog/quiz-dialog.component';
import swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
// import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css']
})
export class QuestionDialogComponent implements OnInit {
  // public Editor = ClassicEditorBuild;
  actionBtn: string = 'Submit';
  questionForm!: FormGroup;
  qid!: string | null;
  question!: Question;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<QuizDialogComponent>, private route: ActivatedRoute, private questionService: QuestionService, private quizService: QuizService, private toastrService: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.questionForm = this.formBuilder.group({
      content: ['', [Validators.required, Validators.minLength(8)]],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: [''],
      option4: [''],
      answer: ['', Validators.required]
    })

    if (this.data.action === 'update') {
      this.actionBtn = 'Update'
      this.questionForm.controls['content'].setValue(this.data.question.content);
      if (this.data.question.options[0]) {
        this.questionForm.controls['option1'].setValue(this.data.question.options[0]);
      }
      if (this.data.question.options[1]) {
        this.questionForm.controls['option2'].setValue(this.data.question.options[1]);
      }
      if (this.data.question.options[2]) {
        this.questionForm.controls['option3'].setValue(this.data.question.options[2]);
      }
      if (this.data.question.options[3]) {
        this.questionForm.controls['option4'].setValue(this.data.question.options[3]);
      }
      this.questionForm.controls['answer'].setValue(this.data.question.answer);
    }
  }

  onSubmit() {
    if (this.questionForm.valid) {
      if (this.data.action === 'add') {
        this.addQuestion();
      } else if (this.data.action === 'update') {
        this.updateQuestion();
      }
    }
  }

  addQuestion() {
    this.question = new Question();
    this.question.content = this.questionForm.value.content;
    if (this.questionForm.get('option1')?.value) {
      this.question.options.push(this.questionForm.value.option1);
    }
    if (this.questionForm.get('option2')?.value) {
      this.question.options.push(this.questionForm.value.option2);
    }
    if (this.questionForm.get('option3')?.value) {
      this.question.options.push(this.questionForm.value.option3);
    }
    if (this.questionForm.get('option4')?.value) {
      this.question.options.push(this.questionForm.value.option4);
    }
    this.question.answer = this.questionForm.value.answer;
    this.question.quizId = this.data.quizId;

    this.questionService.addQuestion(this.question).subscribe(res => {
      this.questionForm.reset();
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

  updateQuestion() {
    this.question = new Question();
    this.question.content = this.questionForm.value.content;
    if (this.questionForm.get('option1')?.value) {
      this.question.options.push(this.questionForm.value.option1);
    }
    if (this.questionForm.get('option2')?.value) {
      this.question.options.push(this.questionForm.value.option2);
    }
    if (this.questionForm.get('option3')?.value) {
      this.question.options.push(this.questionForm.value.option3);
    }
    if (this.questionForm.get('option4')?.value) {
      this.question.options.push(this.questionForm.value.option4);
    }
    this.question.answer = this.questionForm.value.answer;
    this.question.quizId = this.data.quizId;

    this.questionService.updateQuestion(this.data.question.queId, this.question).subscribe(res => {
      this.questionForm.reset();
      this.dialogRef.close('update');
      swal.fire('Success', 'Question updated successfully!', 'success');
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
