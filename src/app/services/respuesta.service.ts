// respuesta.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Respuesta {
  id?: number;
  contenido: string;
  pregunta_id: number;
  usuario_id: number;
  fecha_creacion?: string;
  usuario?: {
    id: number;
    nombre_usuario: string;
    foto_perfil: string | null;
  };
}

@Injectable({
  providedIn: 'root',
})
export class RespuestaService {
  private baseUrl = 'http://3.215.146.244:8000';

  constructor(private http: HttpClient) {}

  // Obtener respuestas por pregunta
  getRespuestasByQuestion(preguntaId: number): Observable<Respuesta[]> {
    const url = `${this.baseUrl}/preguntas/${preguntaId}/respuestas/`;
    return this.http.get<Respuesta[]>(url);
  }

  // Crear una nueva respuesta
  createRespuesta(respuesta: Respuesta): Observable<Respuesta> {
    return this.http.post<Respuesta>(`${this.baseUrl}/respuestas/`, respuesta);
  }
}
