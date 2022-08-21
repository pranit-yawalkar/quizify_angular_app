import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizId!: number;
  questions!: any;

  marksGot: number = 0;
  correctAnswers: number = 0;
  questionsAttempted: number = 0;
  marks: number = 0;
  isSubmitted: boolean = false;

  timer!: any;
  percent!: any;
  color: string = 'primary';

  constructor(private locationStrategy: LocationStrategy, private route: ActivatedRoute, private questionService: QuestionService, private quizService: QuizService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.quizId = this.route.snapshot.params['quizId'];
    this.getQuestions(this.quizId);
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, '', location.href);
    })
  }

  getQuestions(qid: number) {
    this.questionService.getQuestionsByQuiz(qid).subscribe(data => {
      this.questions = data;
      this.timer = this.questions.length * 0.5 * 60;
      console.log(this.questions);
      this.runTimer();
    }, error => {
      console.log(error);
    })
  }

  evaluateQuiz() {
    // this.marks = this.questions[0].quiz.maxMarks / this.questions.length;
    // this.questions.forEach((question: any) => {
    //   if (question.givenAnswer === question.answer) {
    //     this.correctAnswers++;
    //   }

    //   if (question.givenAnswer.trim() !== '') {
    //     this.questionsAttempted++;
    //   }
    // })

    // this.marksGot = this.marks * this.correctAnswers;
    // console.log("Correct ans: " + this.marksGot.toString());
    // console.log("Attempted: " + this.questionsAttempted);
    this.quizService.evaluateQuiz(this.questions).subscribe((data: any) => {
      console.log(data);
      this.marks = data.marks;
      this.correctAnswers = data.correctAnswers;
      this.questionsAttempted = data.questionsAttempted;
      this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
      this.isSubmitted = true;
    }, error => {
      console.log(error);
    })

  }

  submitQuiz() {
    swal.fire({
      icon: 'warning',
      title: 'Do you really want to submit the quiz?',
      confirmButtonText: 'Submit',
      showCancelButton: true
    }).then((res) => {
      if (res.isConfirmed) {
        this.evaluateQuiz();
        swal.fire('Success', 'Quiz Submitted Successfully!', 'success');
      }
    })
  }

  runTimer() {
    let t = setInterval(() => {
      if (this.timer <= 0) {
        this.evaluateQuiz();
        clearInterval(t);
      }

      this.timer--;
      this.percent = (this.timer / (this.questions.length * 0.5 * 60)) * 100;
      if (this.percent >= 75) {
        this.color = 'primary';
      } else if (this.percent >= 30 && this.percent <= 75) {
        this.color = 'accent';
      } else {
        this.color = 'warn';
      }
    }, 1000);
  }

  getFormattedDate() {
    let hrs = Math.floor(this.timer / 3600).toString();
    let mins = Math.floor(this.timer / 60).toString();
    let secs = (this.timer - parseInt(mins) * 60).toString();
    if (mins.length === 1) {
      mins = '0' + mins;
    }
    if (secs.length === 1) {
      secs = '0' + secs;
    }
    if (hrs === '0') {
      return `${mins} : ${secs} min`;
    }
    return `${hrs} hrs : ${mins} mins : ${secs} sec`;
  }

  printResult() {
    window.print();
  }
}
