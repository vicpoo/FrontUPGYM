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
    return this.http.get<any[]>(url).pipe(
      map((data) =>
        data.map((question) => ({
          id: question.id,
          contenido: question.contenido || 'Contenido no disponible',
          question_id: question.question_id,
          usuario_id: question.usuario_id,
          usuario_nombre: question.usuario?.nombre_usuario || 'Usuario desconocido',
          usuario_foto: question.usuario?.foto_perfil || null,
          fecha_creacion: question.fecha_creacion
            ? new Date(question.fecha_creacion)
            : undefined, // Cambiado de null a undefined
        }))
      )
    );
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
