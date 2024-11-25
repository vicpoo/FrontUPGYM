import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PorcentajeGrasa } from '../interfaces/PorcentajeGrasa';

@Injectable({
  providedIn: 'root',
})
export class PorcentajeGrasaService {
  private readonly baseUrl = 'http://127.0.0.1:8000';
  
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');  // Obtener token de sessionStorage
    console.log(token);  // Verifica que el token esté presente
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }
  

  crearRegistro(registro: PorcentajeGrasa): Observable<PorcentajeGrasa> {
    return this.http.post<PorcentajeGrasa>(`${this.baseUrl}/Grasa`, registro, { headers: this.getHeaders() });
  }
  

  getHistorial(): Observable<PorcentajeGrasa[]> {
    return this.http.get<PorcentajeGrasa[]>(`${this.baseUrl}/Grasa/historial`, { headers: this.getHeaders() });
  }
}
