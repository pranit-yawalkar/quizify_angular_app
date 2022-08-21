import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  public getQuizzes(): Observable<Object> {
    return this.http.get(`${this.BASE_URL}/quiz`);
  }

  public getQuizzesByCategory(categoryId: number): Observable<Object> {
    return this.http.get(`${this.BASE_URL}/quiz/category/${categoryId}`);
  }

  public getQuizById(qid: number): Observable<Object> {
    return this.http.get(`${this.BASE_URL}/quiz/${qid}`);
  }

  public getActiveQuizzes(): Observable<Object> {
    return this.http.get(`${this.BASE_URL}/quiz/active`);
  }

  public getActiveQuizzesByCategory(categoryId: number): Observable<Object> {
    return this.http.get(`${this.BASE_URL}/quiz/category/active/${categoryId}`);
  }

  public addQuiz(quiz: any): Observable<Object> {
    console.log(quiz);
    return this.http.post(`${this.BASE_URL}/quiz`, quiz);
  }

  public updateQuiz(quiz: any, quizId: number): Observable<Object> {
    console.log(quiz);
    return this.http.put(`${this.BASE_URL}/quiz/${quizId}`, quiz);
  }

  public deleteQuiz(quizId: number): Observable<Object> {
    return this.http.delete(`${this.BASE_URL}/quiz/${quizId}`);
  }

  public evaluateQuiz(questions: any): Observable<Object> {
    return this.http.post(`${this.BASE_URL}/quiz/eval-quiz`, questions);
  }
}
