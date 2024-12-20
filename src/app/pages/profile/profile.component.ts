import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { PostDetailComponent } from '../../component/PostDetailComponent/post-detail.component'; // Importa PostDetailComponent
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { QuestionService } from '../../services/question.service';
import { Post } from '../../interfaces/post';
import { BottomNavComponent } from '../../component/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    BottomNavComponent,
    PostDetailComponent, // Importa el PostDetailComponent
  ],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  isEditModalOpen = false;
  isPostModalOpen = false;
  isQuestionModalOpen = false;
  isMenuOpen: { [postId: number]: boolean } = {}; // Estado dinámico para los menús

  user: any = {
    id: null,
    name: '',
    correo: '',
    description: '',
    foto_perfil: '',
    followers: 0,
    posts: [],
  };

  selectedPost: Post | null = null; // Almacena la publicación seleccionada
  selectedImage: File | null = null;

  newPost: Post = {
    id: 0,
    descripcion: '',
    imagen: null,
    usuario_id: 0,
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
    this.loadPosts(); // Cargar publicaciones del usuario
  }

  loadUserProfile(): void {
    this.userService.getCurrentUser().subscribe({
      next: (data) => {
        this.user = {
          id: data.id,
          name: data.nombre_usuario,
          correo: data.correo,
          description: data.descripcion || 'Sin descripción',
          // Asegúrate de que la foto_perfil esté formateada correctamente
          foto_perfil: data.foto_perfil
            ? `data:image/jpeg;base64,${data.foto_perfil}`  // Convertir a URL Base64
            : '/customIDfoto',  // Imagen predeterminada
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
        this.user.posts = posts.filter(
          (post) => post.usuario_id === this.user.id
        );
      },
      error: (err) => {
        console.error('Error al cargar las publicaciones:', err);
      },
    });
  }

  togglePostMenu(postId: number, event: Event): void {
    event.stopPropagation();
    this.isMenuOpen = { [postId]: !this.isMenuOpen[postId] };
  }

  closeAllMenus(): void {
    this.isMenuOpen = {};
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.closeAllMenus();
    }
  }

  openPostDetail(post: Post): void {
    this.selectedPost = post; // Almacena el post seleccionado
  }

  closePostDetail(): void {
    this.selectedPost = null; // Cierra el modal limpiando el post seleccionado
  }

  // Métodos para manejar modales existentes
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

  // Métodos para manejar publicaciones
  openPostModal(): void {
    this.isPostModalOpen = true;
  }

  openEditPostModal(post: Post): void {
    this.newPost = { ...post };
    this.isPostModalOpen = true;
  }

  closePostModal(): void {
    this.isPostModalOpen = false;
    this.newPost = { id: 0, descripcion: '', imagen: null, usuario_id: 0 };
  }

  onPostImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newPost.imagen = file;
    }
  }

  createOrUpdatePost(): void {
    const formData = new FormData();
    formData.append('descripcion', this.newPost.descripcion);

    if (this.newPost.imagen && typeof this.newPost.imagen !== 'string') {
      formData.append('imagen', this.newPost.imagen);
    }

    formData.append('usuario_id', this.user.id.toString());

    if (this.newPost.id) {
      this.postService.updatePost(this.newPost.id, formData).subscribe({
        next: (updatedPost) => {
          alert('Publicación actualizada correctamente.');
          const index = this.user.posts.findIndex(
            (post: Post) => post.id === this.newPost.id
          );
          this.user.posts[index] = { ...updatedPost, imagen: updatedPost.imagen };
          this.closePostModal();
        },
        error: (err) => {
          console.error('Error al actualizar la publicación:', err);
        },
      });
    } else {
      this.postService.createPost(formData).subscribe({
        next: (createdPost) => {
          alert('Publicación creada correctamente.');
          this.user.posts = [
            ...this.user.posts,
            { ...createdPost, imagen: createdPost.imagen },
          ];
          this.closePostModal();
        },
        error: (err) => {
          console.error('Error al crear la publicación:', err);
        },
      });
    }
  }

  deletePost(postId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
      this.postService.deletePost(postId).subscribe({
        next: () => {
          alert('Publicación eliminada correctamente.');
          this.user.posts = this.user.posts.filter(
            (post: Post) => post.id !== postId
          );
        },
        error: (err) => {
          console.error('Error al eliminar la publicación:', err);
        },
      });
    }
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