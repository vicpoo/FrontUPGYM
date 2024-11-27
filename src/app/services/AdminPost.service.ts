import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';


@Injectable({
  providedIn: 'root',
})
export class AdminPostService {
  private baseUrl = 'http://3.215.146.244:8000/admin';

  constructor(private http: HttpClient) {}

  /**
   * Obtener todas las publicaciones (para administración).
   * @returns Observable con la lista de publicaciones.
   */
  getAllPosts(): Observable<Post[]> {
    const url = `${this.baseUrl}/posts/`;
    return this.http.get<Post[]>(url);
  }

  /**
   * Eliminar una publicación por ID (para administración).
   * @param postId El ID de la publicación a eliminar.
   * @returns Observable con el resultado de la operación.
   */
  deletePost(postId: number): Observable<any> {
    const url = `${this.baseUrl}/post/${postId}`;
    return this.http.delete(url);
  }
}
