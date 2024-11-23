import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) {}

  // Login
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login`, credentials);
  }

  // Create User
  createUser(user: { nombre_usuario: string; correo: string; contraseña: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}user/`, user);
  }

  // Get Current User
  getCurrentUser(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.get<any>(`${this.apiUrl}user/me`, { headers });
  }

  // Update User
  updateUser(userId: number, userData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.put<any>(`${this.apiUrl}user/${userId}`, userData, { headers });
  }

  // Check if logged in
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  // Logout
  logout(): void {
    sessionStorage.removeItem('token');
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`/api/users/${userId}`);
  }
  
}
