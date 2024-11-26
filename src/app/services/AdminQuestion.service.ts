import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Para transformar los datos en caso necesario
import { Respuesta } from '../interfaces/respuesta';

@Injectable({
  providedIn: 'root',
})
export class AdminQuestionService {
  private baseUrl = 'http://127.0.0.1:8000/admin';

  constructor(private http: HttpClient) {}

  /**
   * Obtener todas las preguntas (para administración).
   * Transforma los datos para cumplir con la interfaz `Respuesta`.
   * @returns Observable con la lista de preguntas.
   */
  getAllQuestions(): Observable<Respuesta[]> {
    const url = `${this.baseUrl}/questions/`;
    return this.http.get<Respuesta[]>(url);
  }

  /**
   * Eliminar una pregunta por ID (para administración).
   * @param questionId El ID de la pregunta a eliminar.
   * @returns Observable con el resultado de la operación.
   */
  deleteQuestion(questionId: number): Observable<any> {
    const url = `${this.baseUrl}/question/${questionId}`;
    return this.http.delete(url);
  }
}
