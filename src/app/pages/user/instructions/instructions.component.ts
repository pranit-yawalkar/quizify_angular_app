import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  quizId!: number;
  quiz!: any;

  constructor(private route: ActivatedRoute, private quizService: QuizService, private router: Router) { }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.params['quizId'];
    this.quizService.getQuizById(this.quizId).subscribe(data => {
      this.quiz = data;
      console.log(this.quiz);
    }, error => {
      console.log(error);
    })
  }

  startQuiz(quizId: number) {
    swal.fire({
      icon: 'info',
      title: 'Do you really want to start the quiz?',
      confirmButtonText: 'Start',
      showCancelButton: true
    }).then((res) => {
      if (res.isConfirmed) {
        this.router.navigate(['/quiz/start/', quizId])
      }
    })
  }
}
