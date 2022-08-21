import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  public getAllQuestionsByQuiz(qid: number): Observable<Object> {
    return this.http.get(`${this.BASE_URL}/question/quiz/${qid}/getAll`);
  }

  public getQuestionsByQuiz(qid: number): Observable<Object> {
    return this.http.get(`${this.BASE_URL}/question/quiz/${qid}`);
  }

  public addQuestion(question: any): Observable<Object> {
    console.log(question);
    return this.http.post(`${this.BASE_URL}/question`, question);
  }

  public updateQuestion(questionId: number, question: any): Observable<Object> {
    return this.http.put(`${this.BASE_URL}/question/${questionId}`, question);
  }

  public deleteQuestion(questionId: number): Observable<Object> {
    return this.http.delete(`${this.BASE_URL}/question/${questionId}`);
  }

}
