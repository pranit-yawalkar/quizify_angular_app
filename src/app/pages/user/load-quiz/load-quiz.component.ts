import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  categoryId!: any;
  quizzes!: any;

  constructor(private route: ActivatedRoute, private quizService: QuizService, private router: Router) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      console.log(params);

      this.categoryId = params['category'];
      if (this.categoryId === 'all' || this.categoryId === undefined) {
        this.quizService.getActiveQuizzes().subscribe(res => {
          this.quizzes = res;
          console.log(this.quizzes);
        })
      } else {
        console.log(this.categoryId);
        this.quizService.getActiveQuizzesByCategory(this.categoryId).subscribe(data => {
          this.quizzes = data;
          console.log(this.quizzes);
        }, error => {
          console.log(error);
        })
      }
    })
  }

  startQuiz(qid: number) {
    this.router.navigate(['/user-dashboard/instructions/', qid]);
  }

}
