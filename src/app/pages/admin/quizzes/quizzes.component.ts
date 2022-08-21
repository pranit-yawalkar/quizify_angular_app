import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuizDialogComponent } from 'src/app/components/quiz-dialog/quiz-dialog.component';
import { QuizService } from 'src/app/services/quiz.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {

  quizzes!: any;

  constructor(private quizService: QuizService, private dialog: MatDialog,
    private toastrService: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getQuizzes();
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  getQuizzes(): void {
    this.quizService.getQuizzes().subscribe(data => {
      this.quizzes = data;
    }, error => {
      console.log(error);
    })
  }

  addQuiz() {
    this.dialog.open(QuizDialogComponent, {
      width: "500px"
    }).afterClosed().subscribe(res => {
      if (res === 'save') {
        this.getQuizzes();
      }
    })
  }

  updateQuiz(quiz: any): void {
    console.log(quiz);
    this.dialog.open(QuizDialogComponent, {
      width: '500px',
      data: quiz
    }).afterClosed().subscribe(res => {
      if (res === 'update') {
        this.getQuizzes();
      }
    })
  }

  deleteQuiz(quiz: any): void {
    swal.fire({
      icon: 'warning',
      title: 'Do you really want to delete this quiz?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((res) => {
      if (res.isConfirmed) {
        this.quizService.deleteQuiz(quiz.qid).subscribe(response => {
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
