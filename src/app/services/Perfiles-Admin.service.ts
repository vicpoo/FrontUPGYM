import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Admin {
  id: number; // Cambiado para asegurar consistencia con la base de datos
  nombre: string;
  apellido: string;
  correo: string;
  contraseña: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://127.0.0.1:8000/admin/'; // Endpoint base para administradores

  constructor(private http: HttpClient) {}

  // Obtener la lista de administradores
  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.apiUrl}list`); // Asegúrate de que `/list` retorne administradores
  }

  // Crear un nuevo administrador
  createAdmin(admin: Admin): Observable<Admin> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Admin>(`${this.apiUrl}create`, admin, { headers }); // `/create` debe insertar en la tabla de administradores
  }

  // Actualizar un administrador existente
  updateAdmin(adminId: number, adminData: Partial<Admin>): Observable<any> {
    return this.http.put(`${this.apiUrl}update/${adminId}`, adminData); // Endpoint para actualizaciones
  }

  // Eliminar un administrador por ID
  deleteAdmin(adminId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}delete/${adminId}`); // `/delete` debe manejar eliminación de administradores
  }
}
