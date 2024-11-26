import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarAdminComponent } from '../../../component/sidebar-Admin/sidebar-admin.component';
import { AdminPostService } from '../../../services/AdminPost.service';
import { AdminQuestionService } from '../../../services/AdminQuestion.service';
import { forkJoin } from 'rxjs';
import { Post } from '../../../interfaces/post';
import { Respuesta } from '../../../interfaces/respuesta';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidebarAdminComponent],
  templateUrl: './home-admin.component.html',
})
export class HomeAdminComponent implements OnInit {
  posts: any[] = []; // Lista combinada de publicaciones y preguntas
  isLoading = false; // Controla el estado de carga
  selectedTab: string = 'paraTi'; // Control de pestañas
  isMenuOpen: { [key: number]: boolean } = {}; // Estado del menú desplegable por publicación/pregunta

  constructor(
    private postService: AdminPostService,
    private questionService: AdminQuestionService
  ) {}

  ngOnInit(): void {
    this.loadContent(); // Carga inicial del contenido
  }

  // Cambiar pestaña
  selectTab(tab: string): void {
    this.selectedTab = tab;
    this.loadContent();
  }

  // Método principal para cargar publicaciones y preguntas
  loadContent(): void {
    this.isLoading = true; // Activar loader

    forkJoin({
      posts: this.postService.getAllPosts(),
      questions: this.questionService.getAllQuestions(),
    }).subscribe({
      next: ({ posts, questions }) => {
        const formattedPosts = posts.map((post: Post) => ({
          ...post,
          type: 'post',
          usuario: {
            nombre: post.usuario?.nombre_usuario || 'Usuario desconocido',
            foto_perfil: post.usuario?.foto_perfil || null,
          },
          fecha_creacion: post.fechaCreacion
            ? new Date(post.fechaCreacion)
            : null,
        }));

        const formattedQuestions = questions.map((question: Respuesta) => ({
          ...question,
          type: 'question',
          usuario: {
            nombre: question.usuario_nombre || 'Usuario desconocido',
            foto_perfil: question.usuario_foto || null,
          },
          fecha_creacion: question.fecha_creacion || null,
        }));

        this.posts = [...formattedPosts, ...formattedQuestions].sort((a, b) => {
          const dateA = a.fecha_creacion ? new Date(a.fecha_creacion).getTime() : 0;
          const dateB = b.fecha_creacion ? new Date(b.fecha_creacion).getTime() : 0;
          return dateB - dateA;
        });
      },
      error: (err) => {
        console.error('Error al cargar contenido:', err);
      },
      complete: () => {
        this.isLoading = false; // Desactivar loader
      },
    });
  }

  // Alternar el menú desplegable de una publicación/pregunta
  togglePostMenu(id: number, event: Event): void {
    event.stopPropagation(); // Evitar cierres accidentales
    this.isMenuOpen = { [id]: !this.isMenuOpen[id] }; // Alternar estado del menú
  }

  // Cerrar todos los menús
  closeAllMenus(): void {
    this.isMenuOpen = {}; // Reiniciar el estado de los menús
  }

  // Eliminar una publicación o pregunta
  deleteItem(item: any): void {
    const deleteObservable =
      item.type === 'post'
        ? this.postService.deletePost(item.id)
        : this.questionService.deleteQuestion(item.id);

    deleteObservable.subscribe({
      next: () => {
        this.posts = this.posts.filter((post) => post.id !== item.id);
      },
      error: (err) => console.error('Error al eliminar:', err),
    });
  }
}
