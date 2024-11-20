import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../../app/interfaces/news';

@Injectable({
  providedIn: 'root',
})
export class NoticiasService {
  private apiUrl = 'http://127.0.0.1:8000/news/';

  constructor(private http: HttpClient) {}

  getNoticias(): Observable<News[]> {
    return this.http.get<News[]>(this.apiUrl);
  }

  createNoticia(formData: FormData): Observable<News> {
    return this.http.post<News>(this.apiUrl, formData);
  }

  updateNoticia(id: number, formData: FormData): Observable<News> {
    return this.http.put<News>(`${this.apiUrl}${id}`, formData);
  }

  deleteNoticia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }

  getNoticiaById(id: number): Observable<News> {
    return this.http.get<News>(`${this.apiUrl}${id}`);
  }
  
}
