import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'http://127.0.0.1:8000/comments';

  constructor(private http: HttpClient) {}

  // Obtener comentarios por ID de publicación
  getComments(postId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/${postId}`);
  }

  // Agregar un comentario
  addComment(commentData: any) {
    return this.http.post<any>('http://127.0.0.1:8000/comment/', commentData);
  }
}
