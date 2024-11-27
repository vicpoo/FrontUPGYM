import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnuncioService {
  private apiUrl = 'http://3.215.146.244:8000'; // URL de tu API FastAPI

  constructor(private http: HttpClient) {}

  // Crear un nuevo anuncio
  createAnuncio(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/anuncio/`, formData);
  }

  // Obtener todos los anuncios
  getAnuncios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/anuncios/`);
  }

  // Obtener un anuncio por ID
  getAnuncio(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/anuncio/${id}`);
  }

  // Actualizar un anuncio por ID
  updateAnuncio(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/anuncio/${id}`, formData);
  }

  // Eliminar un anuncio por ID
  deleteAnuncio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/anuncio/${id}`);
  }
}
