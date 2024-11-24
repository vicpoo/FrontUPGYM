import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para directivas como *ngIf y *ngFor
import { SidebarComponent } from '../../component/sidebar/sidebar.component'; // Sidebar
import { BottomNavComponent } from '../../component/bottom-nav/bottom-nav.component'; // Navegación inferior
import { PostDetailComponent } from '../../component/PostDetailComponent/post-detail.component'; // Modal de detalles de publicaciones
import { RespuestaComponent } from '../../component/Respuesta/respuesta.component'; // Modal de preguntas/respuestas
import { PostService } from '../../services/post.service'; // Servicio para publicaciones
import { QuestionService } from '../../services/question.service'; // Servicio para preguntas
import { forkJoin } from 'rxjs'; // Importamos forkJoin para combinar los flujos

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
  isLoading = false; // Controla el estado de carga
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

  // Método principal para cargar y mezclar contenido
  loadContent(): void {
    this.isLoading = true;

    // Combinar las solicitudes de publicaciones y preguntas
    forkJoin({
      posts: this.postService.getPosts(),
      questions: this.questionService.getQuestions(),
    }).subscribe({
      next: ({ posts, questions }) => {
        // Procesar publicaciones
        const formattedPosts = posts.map((post) => ({
          ...post,
          type: 'post',
          usuario: {
            nombre_usuario: post.usuario?.nombre_usuario || 'Usuario desconocido',
            foto_perfil: post.usuario?.foto_perfil || null, // Foto en Base64 o null
          },
          fechaCreacion: new Date(post.fechaCreacion || Date.now()),
        }));

        // Procesar preguntas
        const formattedQuestions = questions.map((question) => ({
          ...question,
          type: 'question',
          fechaCreacion: new Date(question.fecha_creacion || Date.now()),
        }));

        // Mezclar y alternar el contenido
        this.posts = this.mergeContent(formattedPosts, formattedQuestions);
      },
      error: (err) => {
        console.error('Error al cargar contenido:', err);
      },
      complete: () => {
        this.isLoading = false; // Finaliza la carga
      },
    });
  }

  // Método para mezclar publicaciones y preguntas en orden alternado (uno a uno)
  mergeContent(posts: any[], questions: any[]): any[] {
    // Ordenar ambas listas por fecha de creación en orden descendente (nueva a antigua)
    posts.sort((a, b) => b.fechaCreacion.getTime() - a.fechaCreacion.getTime());
    questions.sort((a, b) => b.fechaCreacion.getTime() - a.fechaCreacion.getTime());

    const result: any[] = [];
    let postIndex = 0;
    let questionIndex = 0;

    // Alternar entre publicaciones y preguntas
    while (postIndex < posts.length || questionIndex < questions.length) {
      // Agregar la siguiente publicación si está disponible
      if (postIndex < posts.length) {
        result.push(posts[postIndex]);
        postIndex++;
      }

      // Agregar la siguiente pregunta si está disponible
      if (questionIndex < questions.length) {
        result.push(questions[questionIndex]);
        questionIndex++;
      }
    }

    return result;
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
