import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../interfaces/Admin';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://127.0.0.1:8000/admin/';
  private apiUrlAdmins = 'http://127.0.0.1:8000/admins';
  private apiUrlLogin = 'http://127.0.0.1:8000/admin/login';

  constructor(private http: HttpClient) {}

  getAdmin(adminId: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.apiUrl}${adminId}`);
  }

  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.apiUrlAdmins);
  }

  createAdmin(admin: Admin): Observable<Admin> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Admin>(this.apiUrl, admin, { headers });
  }

  updateAdmin(adminId: number, adminData: Partial<Admin>): Observable<any> {
    // Crear un objeto FormData para enviar los datos del administrador
    const formData = new FormData();
    formData.append('nombre', adminData.nombre || '');
    formData.append('apellido', adminData.apellido || '');
    formData.append('correo', adminData.correo || '');
    if (adminData.contraseña) {
      formData.append('contraseña', adminData.contraseña);
    }
    if (adminData.nombre_administrador) {
      formData.append('nombre_administrador', adminData.nombre_administrador);
    }

    return this.http.put(`${this.apiUrl}${adminId}`, formData);
  }

  deleteAdmin(adminId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${adminId}`);
  }

  adminLogin(credentials: { correo: string; contraseña: string }): Observable<any> {
    return this.http.post(this.apiUrlLogin, credentials);
  }
}
