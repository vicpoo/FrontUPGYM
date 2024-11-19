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

  createNoticia(news: News): Observable<News> {
    return this.http.post<News>(this.apiUrl, news);
  }

  updateNoticia(id: number, news: News): Observable<News> {
    return this.http.put<News>(`${this.apiUrl}${id}`, news);
  }

  deleteNoticia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}
