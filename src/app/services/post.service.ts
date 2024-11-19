import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = 'http://127.0.0.1:8000/posts/';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl);
  }

  createPost(postData: FormData): Observable<Post> {
    return this.http.post<Post>('http://127.0.0.1:8000/post/', postData);
  }

  updatePost(postId: number, postData: FormData): Observable<Post> {
    return this.http.put<Post>('http://127.0.0.1:8000/post/${postId}', postData);
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>('http://127.0.0.1:8000/post/${postId}');
  }
}