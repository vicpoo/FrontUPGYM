import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PremiumService {
  private apiUrl = 'http://127.0.0.1:8000'; // Endpoint base de la API

  constructor(private http: HttpClient) {}

  // Obtener token de autenticación desde localStorage
  private getAuthToken(): string {
    return localStorage.getItem('authToken') || '';
  }

  // Obtener la lista de usuarios
  getUsers(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAuthToken()}`,
    });
    return this.http.get<any[]>(`${this.apiUrl}/users`, { headers }).pipe(
      catchError((error) => {
        console.error('Error al cargar usuarios:', error);
        return throwError(() => new Error('No se pudo cargar la lista de usuarios.'));
      })
    );
  }

  // Cambiar el estado es_premium de un usuario
  updateEsPremium(userId: number, esPremium: boolean): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAuthToken()}`,
    });

    // Utilizamos FormData para enviar es_premium
    const body = new FormData();
    body.append('es_premium', esPremium.toString());

    return this.http
      .patch(`${this.apiUrl}/user/${userId}/premium`, body, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error al actualizar es_premium:', error);
          return throwError(() => new Error('No se pudo actualizar el estado premium del usuario.'));
        })
      );
  }
}
