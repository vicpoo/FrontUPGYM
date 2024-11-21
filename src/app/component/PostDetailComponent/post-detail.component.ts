import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgClass, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, NgClass],
  templateUrl: './post-detail.component.html',
})
export class PostDetailComponent implements OnInit {
  @Input() post: any;
  @Output() close = new EventEmitter<void>();

  comments: any[] = [];
  likesCount = 0;
  liked = false;
  newComment = '';
  userId: number | null = null;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUserId();
    this.loadLikes();
    this.loadComments();
  }

  loadUserId(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.userId = user.id;
      },
      error: (err) => {
        console.error('Error al cargar el usuario:', err);
      },
    });
  }

  loadLikes(): void {
    this.likesCount = this.post.likes?.length || 0;
    this.liked = this.post.likes?.some((like: any) => like.usuario_id === this.userId);
  }

  loadComments(): void {
    this.commentService.getComments(this.post.id).subscribe({
      next: (comments) => {
        // Aquí se asegura que cada comentario tenga los datos del usuario
        this.comments = comments.map(comment => {
          return {
            ...comment,
            usuario_nombre: comment.usuario_nombre, // Verifica que el backend esté enviando esto
            usuario_foto: comment.usuario_foto      // Verifica que el backend esté enviando esto
          };
        });
        
      },
      error: (err) => {
        console.error('Error al cargar comentarios:', err);
      },
    });
  }

  toggleLike(): void {
    if (!this.userId) {
      console.error('Usuario no autenticado.');
      return;
    }

    if (this.liked) {
      const likeId = this.post.likes.find((like: any) => like.usuario_id === this.userId)?.id;
      if (!likeId) {
        console.error('No se pudo encontrar el ID del like para eliminar.');
        return;
      }

      this.postService.removeLike(likeId).subscribe({
        next: () => {
          this.liked = false;
          this.likesCount--;
        },
        error: (err) => {
          console.error('Error al eliminar el like:', err);
        },
      });
    } else {
      this.postService.addLike(this.post.id, this.userId).subscribe({
        next: () => {
          this.liked = true;
          this.likesCount++;
        },
        error: (err) => {
          console.error('Error al agregar el like:', err);
        },
      });
    }
  }

  addComment(): void {
    if (!this.newComment.trim() || !this.userId) {
      console.error('Comentario vacío o usuario no autenticado.');
      return;
    }

    const commentData = {
      contenido: this.newComment,
      publicacion_id: this.post.id,
      usuario_id: this.userId,
    };

    this.commentService.addComment(commentData).subscribe({
      next: (comment) => {
        this.comments.push(comment);
        this.newComment = '';
      },
      error: (err) => {
        console.error('Error al agregar comentario:', err);
      },
    });
  }

  closeModal(): void {
    this.close.emit();
  }
}
