import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { BottomNavComponent } from '../../component/bottom-nav/bottom-nav.component';
import { PostDetailComponent } from '../../component/PostDetailComponent/post-detail.component';
import { RespuestaComponent } from '../../component/Respuesta/respuesta.component';
import { PostService } from '../../services/post.service';
import { QuestionService } from '../../services/question.service';
import { AnuncioService } from '../../services/anuncio.service';
import { UserService } from '../../services/user.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
  posts: any[] = [];
  isLoading = false;
  selectedTab: string = 'paraTi';
  selectedPost: any = null;
  selectedQuestion: any = null;
  isPremium: boolean = false;

  constructor(
    private postService: PostService,
    private questionService: QuestionService,
    private anuncioService: AnuncioService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadContent(); // Carga el contenido sin esperar la verificación de usuario
  }

  // Cambiar pestaña
  selectTab(tab: string): void {
    this.selectedTab = tab;
    this.loadContent();
  }

  // Método principal para cargar y mezclar contenido
  loadContent(): void {
    this.isLoading = true;

    // Realizar ambas solicitudes en paralelo: carga de contenido y verificación de premium
    forkJoin({
      user: this.userService.getCurrentUser().pipe(catchError(() => of(null))), // Verifica si es premium, maneja el error si no se puede obtener el usuario
      posts: this.postService.getPosts(),
      questions: this.questionService.getQuestions(),
      ads: this.anuncioService.getAnuncios(),
    }).subscribe({
      next: ({ user, posts, questions, ads }) => {
        // Si la respuesta del usuario es válida, asignamos el estado de premium
        this.isPremium = user?.es_premium || false;

        // Procesar publicaciones
        const formattedPosts = posts.map((post) => ({
          ...post,
          type: 'post',
          usuario: {
            nombre_usuario: post.usuario?.nombre_usuario || 'Usuario desconocido',
            foto_perfil: post.usuario?.foto_perfil || null,
          },
          fechaCreacion: new Date(post.fechaCreacion || Date.now()),
        }));

        // Procesar preguntas
        const formattedQuestions = questions.map((question) => ({
          ...question,
          type: 'question',
          usuario: {
            nombre_usuario: question.usuario?.nombre_usuario || 'Usuario desconocido',
            foto_perfil: question.usuario?.foto_perfil || null,
          },
          fechaCreacion: new Date(question.fecha_creacion || Date.now()),
        }));

        // Procesar anuncios solo si no es premium
        const formattedAds = this.isPremium
          ? []
          : ads.map((ad) => ({
              ...ad,
              type: 'ad',
              fechaCreacion: new Date(ad.fechaCreacion || Date.now()),
            }));

        // Mezclar contenido y actualizar el estado
        this.posts = this.mergeContent(formattedPosts, formattedQuestions, formattedAds);
      },
      error: (err) => {
        console.error('Error al cargar contenido:', err);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  // Método para mezclar publicaciones, preguntas y anuncios en orden alternado
  mergeContent(posts: any[], questions: any[], ads: any[]): any[] {
    const result: any[] = [];
    let postIndex = 0;
    let questionIndex = 0;
    let adIndex = 0;

    // Alternar entre publicaciones, preguntas y anuncios
    while (postIndex < posts.length || questionIndex < questions.length || adIndex < ads.length) {
      if (postIndex < posts.length) {
        result.push(posts[postIndex]);
        postIndex++;
      }
      if (questionIndex < questions.length) {
        result.push(questions[questionIndex]);
        questionIndex++;
      }
      if (adIndex < ads.length) {
        result.push(ads[adIndex]);
        adIndex++;
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
    this.selectedQuestion = question;
  }

  closeQuestionDetail(): void {
    this.selectedQuestion = null;
  }
}
