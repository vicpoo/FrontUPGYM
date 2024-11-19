import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private baseUrl = 'http://127.0.0.1:8000/question/';

  constructor(private http: HttpClient) {}

  createQuestion(questionData: any): Observable<any> {
    return this.http.post(this.baseUrl, questionData);
  }
}
