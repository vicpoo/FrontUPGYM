import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { BottomNavComponent } from '../../component/bottom-nav/bottom-nav.component';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    BottomNavComponent,
  ],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  isEditModalOpen = false;
  isPostModalOpen = false;
  isQuestionModalOpen = false;
  user: any = {
    id: null,
    name: '',
    correo: '',
    description: '',
    foto_perfil: '',
    followers: 0,
    posts: [],
  };
  selectedImage: File | null = null;

  newPost: any = {
    descripcion: '',
    imagen: null,
  };

  newQuestion: any = {
    contenido: '',
  };

  constructor(
    private userService: UserService,
    private postService: PostService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadPosts(); // Cargar publicaciones del usuario actual
  }

  loadUserProfile(): void {
    this.userService.getCurrentUser().subscribe({
      next: (data) => {
        this.user = {
          id: data.id,
          name: data.nombre_usuario,
          correo: data.correo,
          description: data.descripcion || 'Sin descripción',
          foto_perfil: data.foto_perfil
            ? `data:image/jpeg;base64,${data.foto_perfil}`
            : '/customIDfoto',
        };
      },
      error: (err) => {
        console.error('Error al cargar el perfil:', err);
      },
    });
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe({
      next: (posts) => {
        // Filtrar las publicaciones para mostrar solo las del usuario actual
        this.user.posts = posts
          .filter((post) => post.usuario_id === this.user.id)
          .map((post) => ({
            ...post,
            image: post.imagen,
            description: post.descripcion,
          }));
      },
      error: (err) => {
        console.error('Error al cargar las publicaciones:', err);
      },
    });
  }

  // Métodos para editar perfil
  openEditModal(): void {
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedImage = null;
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.foto_perfil = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveChanges(): void {
    const formData = new FormData();
    formData.append('nombre_usuario', this.user.name);
    formData.append('descripcion', this.user.description);
    if (this.selectedImage) {
      formData.append('foto_perfil', this.selectedImage);
    }

    this.userService.updateUser(this.user.id, formData).subscribe({
      next: () => {
        alert('Perfil actualizado correctamente.');
        this.closeEditModal();
      },
      error: (err) => {
        console.error('Error al actualizar el perfil:', err);
        alert('No se pudo actualizar el perfil.');
      },
    });
  }

  // Métodos para crear post
  openPostModal(): void {
    this.isPostModalOpen = true;
  }

  closePostModal(): void {
    this.isPostModalOpen = false;
    this.newPost = { descripcion: '', imagen: null };
  }

  onPostImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newPost.imagen = file;
    }
  }

  createPost(): void {
    if (!this.user.id) {
      alert('No se puede crear la publicación: usuario no identificado.');
      return;
    }

    const formData = new FormData();
    formData.append('descripcion', this.newPost.descripcion);
    if (this.newPost.imagen) {
      formData.append('imagen', this.newPost.imagen);
    }
    formData.append('usuario_id', this.user.id.toString());

    this.postService.createPost(formData).subscribe({
      next: (createdPost) => {
        alert('Publicación creada correctamente.');
        this.user.posts = [
          ...this.user.posts,
          { ...createdPost, image: createdPost.imagen },
        ];
        this.closePostModal();
      },
      error: (err) => {
        console.error('Error al crear la publicación:', err);
      },
    });
  }

  // Métodos para preguntas
  openQuestionModal(): void {
    this.isQuestionModalOpen = true;
  }

  closeQuestionModal(): void {
    this.isQuestionModalOpen = false;
    this.newQuestion = { contenido: '' };
  }
  
  createQuestion(): void {
    if (!this.user.id) {
      alert('No se puede crear la pregunta: usuario no identificado.');
      return;
    }

    const questionData = {
      contenido: this.newQuestion.contenido,
      usuario_id: this.user.id,
    };

    this.questionService.createQuestion(questionData).subscribe({
      next: () => {
        alert('Pregunta creada correctamente.');
        this.closeQuestionModal();
      },
      error: (err) => {
        console.error('Error al crear la pregunta:', err);
      },
    });
  }
}
