import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login`, credentials);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}user/`, user);
  }

  // Get user profile (assuming this endpoint does not require an ID)
  getUser(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.get<any>(`${this.apiUrl}user`, { headers });
  }

  // Create a new post
  createPost(postData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.post<any>(`${this.apiUrl}post`, postData, { headers });
  }

  // Get current authenticated user’s profile
  getCurrentUser(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.get<any>(`${this.apiUrl}user/me`, { headers });
  }

  updateUser(userId: number, userData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.put<any>(`${this.apiUrl}user/${userId}`, userData, { headers });
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token'); // Checks if a token exists in sessionStorage
  }

  logout(): void {
    sessionStorage.removeItem('token'); // Removes the token to log out
  }
}
