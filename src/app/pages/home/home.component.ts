import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para directivas como *ngIf y *ngFor
import { SidebarComponent } from '../../component/sidebar/sidebar.component'; // Sidebar
import { BottomNavComponent } from '../../component/bottom-nav/bottom-nav.component'; // Navegación inferior
import { PostDetailComponent } from '../../component/PostDetailComponent/post-detail.component'; // Modal de detalles de publicaciones
import { RespuestaComponent } from '../../component/Respuesta/respuesta.component'; // Modal de preguntas/respuestas
import { PostService } from '../../services/post.service'; // Servicio para publicaciones
import { QuestionService } from '../../services/question.service'; // Servicio para preguntas

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    BottomNavComponent,
    PostDetailComponent,
    RespuestaComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  posts: any[] = []; // Lista de publicaciones y preguntas combinadas
  isLoading = true; // Controla el estado de carga
  selectedTab: string = 'paraTi'; // Pestaña activa
  selectedPost: any = null; // Publicación seleccionada
  selectedQuestion: any = null; // Pregunta seleccionada

  constructor(
    private postService: PostService, // Servicio para publicaciones
    private questionService: QuestionService // Servicio para preguntas
  ) {}

  ngOnInit(): void {
    this.loadContent(); // Carga inicial
  }

  // Cambiar pestaña
  selectTab(tab: string): void {
    this.selectedTab = tab;
    this.loadContent();
  }

  // Cargar contenido de publicaciones y preguntas
  loadContent(): void {
    this.isLoading = true;
    const combinedContent: any[] = [];

    // Obtener publicaciones
    this.postService.getPosts().subscribe({
      next: (posts) => {
        const formattedPosts = posts.map((post) => ({
          ...post,
          type: 'post',
          fechaCreacion: new Date(post.fechaCreacion || new Date()),
        }));
        combinedContent.push(...formattedPosts);
      },
      error: (err) => console.error('Error al cargar publicaciones:', err),
      complete: () => {
        // Obtener preguntas
        this.questionService.getQuestions().subscribe({
          next: (questions) => {
            const formattedQuestions = questions.map((question) => ({
              ...question,
              type: 'question',
              fechaCreacion: new Date(question.fechaCreacion || new Date()),
            }));
            combinedContent.push(...formattedQuestions);
          },
          error: (err) => console.error('Error al cargar preguntas:', err),
          complete: () => {
            // Ordenar contenido
            this.posts = combinedContent.sort((a, b) => {
              const dateDiff =
                b.fechaCreacion.getTime() - a.fechaCreacion.getTime();
              return dateDiff || (a.type === 'post' ? -1 : 1);
            });
            this.isLoading = false;
          },
        });
      },
    });
  }

  // Mostrar detalles de una publicación
  openPostDetail(post: any): void {
    this.selectedPost = post;
  }

  closePostDetail(): void {
    this.selectedPost = null;
  }

  // Mostrar detalles de una pregunta
  openQuestionDetail(question: any): void {
    console.log('Pregunta seleccionada:', question); // Log para depuración

    // Reiniciar datos del modal antes de asignar la nueva pregunta
    this.selectedQuestion = null; // Reinicia para forzar la actualización del modal
    setTimeout(() => {
      this.selectedQuestion = question; // Asigna la nueva pregunta después de reiniciar
    });
  }

  // Cerrar modal de respuesta
  closeQuestionDetail(): void {
    console.log('Cerrando modal'); // Depuración
    this.selectedQuestion = null; // Limpia la pregunta seleccionada
  }
}
