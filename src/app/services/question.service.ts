import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  // Crear una nueva pregunta
  createQuestion(questionData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/question/`, questionData);
  }

  // Obtener todas las preguntas
  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/questions/`);
  }

  // Obtener una pregunta por ID
  getQuestionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/question/${id}`);
  }
}

