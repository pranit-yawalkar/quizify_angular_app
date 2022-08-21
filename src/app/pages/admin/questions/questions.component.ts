import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuestionDialogComponent } from 'src/app/components/question-dialog/question-dialog.component';
import { QuestionService } from 'src/app/services/question.service';
import swal from 'sweetalert2'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  public Editor = ClassicEditor;
  qid!: number;
  qtitle!: string;
  questions!: any;

  constructor(private route: ActivatedRoute, private questionService: QuestionService, private dialog: MatDialog, private router: Router, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.qid = this.route.snapshot.params['quizId'];
    this.qtitle = this.route.snapshot.params['qtitle'];
    console.log(this.qtitle);
    this.getAllQuestionsByQuiz(this.qid);
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  getAllQuestionsByQuiz(qid: number) {
    this.questionService.getAllQuestionsByQuiz(qid).subscribe(res => {
      this.questions = res;
    }, error => {
      console.log(error);
    })
  }

  addQuestion() {
    this.dialog.open(QuestionDialogComponent, {
      width: "550px",
      data: { quizId: this.qid, action: 'add' }
    }).afterClosed().subscribe(res => {
      if (res === 'save') {
        this.getAllQuestionsByQuiz(this.qid);
      }
    })
  }

  updateQuestion(question: any) {
    this.dialog.open(QuestionDialogComponent, {
      width: '550px',
      data: { quizId: this.qid, question: question, action: 'update' }
    }).afterClosed().subscribe(res => {
      if (res === 'update') {
        this.getAllQuestionsByQuiz(this.qid);
      }
    })
  }

  deleteQuestion(question: any) {
    swal.fire({
      icon: 'warning',
      title: 'Do you really want to delete this question?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((res) => {
      if (res.isConfirmed) {
        this.questionService.deleteQuestion(question.queId).subscribe(response => {
          swal.fire('Success', 'Quiz deleted successfully!', 'success');
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
