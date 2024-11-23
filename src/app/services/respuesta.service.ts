import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Respuesta {
  id?: number;
  contenido: string;
  pregunta_id: number;
  usuario_id: number;
  fecha_creacion?: string;
  usuario_nombre?: string;
  usuario_foto?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RespuestaService {
    private baseUrl = 'http://127.0.0.1:8000';
  
    constructor(private http: HttpClient) {}
  
    // Obtener respuestas por pregunta
    getRespuestasByQuestion(preguntaId: number): Observable<any> {
        const url = `${this.baseUrl}/preguntas/${preguntaId}/respuestas/`;
        return this.http.get(url);
      }
  
    // Crear una nueva respuesta
    createRespuesta(respuesta: Respuesta): Observable<Respuesta> {
      return this.http.post<Respuesta>(`${this.baseUrl}/respuestas/`, respuesta);
    }
}