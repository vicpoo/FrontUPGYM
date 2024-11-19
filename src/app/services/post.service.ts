import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = 'http://127.0.0.1:8000/posts/'; // URL base para obtener publicaciones

  constructor(private http: HttpClient) {}

  // Obtener todas las publicaciones
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl);
  }

  // Crear una nueva publicación
  createPost(postData: FormData): Observable<Post> {
    return this.http.post<Post>('http://127.0.0.1:8000/post/', postData);
  }

  // Actualizar una publicación existente
  updatePost(postId: number, postData: FormData): Observable<Post> {
    // Usar backticks (`) para interpolar postId en la URL
    return this.http.put<Post>(`http://127.0.0.1:8000/post/${postId}`, postData);
  }

  // Eliminar una publicación
  deletePost(postId: number): Observable<void> {
    // Usar backticks (`) para interpolar postId en la URL
    return this.http.delete<void>(`http://127.0.0.1:8000/post/${postId}`);
  }
}
