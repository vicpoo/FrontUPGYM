import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoticiasService } from '../../../services/noticias.service';
import { News } from '../../../interfaces/news';
import { ReactiveFormsModule } from '@angular/forms';
import { BottomNavComponent } from '../../../component/bottom-nav/bottom-nav.component';
import { SidebarComponent } from '../../../component/sidebar/sidebar.component';

@Component({
  selector: 'app-noticias-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './noticias-admin.component.html'
})
export class NoticiasAdminComponent implements OnInit {
  newsForm!: FormGroup;
  newsList: News[] = [];
  isEditing = false;
  currentNewsId!: number | null;

  constructor(private fb: FormBuilder, private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadNews();
  }

  // Inicializar el formulario
  initializeForm(): void {
    this.newsForm = this.fb.group({
      titulo: ['', [Validators.required]],
      resumen: [''],
      contenido_completo: ['', [Validators.required]],
    });
  }

  // Cargar noticias desde el servicio
  loadNews(): void {
    this.noticiasService.getNoticias().subscribe({
      next: (news) => (this.newsList = news),
      error: (err) => console.error('Error al cargar las noticias:', err),
    });
  }

  // Enviar el formulario
  submitForm(): void {
    if (this.newsForm.invalid) return;

    const formData: News = this.newsForm.value;

    if (this.isEditing && this.currentNewsId) {
      // Editar noticia existente
      this.noticiasService.updateNoticia(this.currentNewsId, formData).subscribe({
        next: () => {
          this.loadNews();
          this.resetForm();
        },
        error: (err) => console.error('Error al actualizar la noticia:', err),
      });
    } else {
      // Crear nueva noticia
      this.noticiasService.createNoticia(formData).subscribe({
        next: () => {
          this.loadNews();
          this.resetForm();
        },
        error: (err) => console.error('Error al crear la noticia:', err),
      });
    }
  }

  // Editar noticia
  editNews(news: News): void {
    this.isEditing = true;
    this.currentNewsId = news.id;
    this.newsForm.patchValue(news);
  }

  // Eliminar noticia
  deleteNews(newsId: number): void {
    if (confirm('¿Estás seguro de eliminar esta noticia?')) {
      this.noticiasService.deleteNoticia(newsId).subscribe({
        next: () => this.loadNews(),
        error: (err) => console.error('Error al eliminar la noticia:', err),
      });
    }
  }

  // Restablecer el formulario
  resetForm(): void {
    this.isEditing = false;
    this.currentNewsId = null;
    this.newsForm.reset();
  }
}
