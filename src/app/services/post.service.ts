import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = 'http://127.0.0.1:8000/posts/'; // Actualizamos la ruta para obtener publicaciones

  constructor(private http: HttpClient) {}

  // Método para obtener publicaciones
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  createPost(postData: FormData): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/post/', postData);
  }

  updatePost(postId: number, postData: FormData): Observable<any> {
    return this.http.put(`http://127.0.0.1:8000/post/${postId}`, postData);
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`http://127.0.0.1:8000/post/${postId}`);
  }

  
}
