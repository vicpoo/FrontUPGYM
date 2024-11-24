import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoticiasService } from '../../../services/noticias.service';
import { News } from '../../../interfaces/news';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarAdminComponent } from '../../../component/sidebar-Admin/sidebar-admin.component';
import { BottomNavAdminComponent } from '../../../component/bottom-nav-admin/bottom-nav.component';
@Component({
  selector: 'app-noticias-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BottomNavAdminComponent, SidebarAdminComponent],
  templateUrl: './noticias-admin.component.html',
})
export class NoticiasAdminComponent implements OnInit {
  newsForm!: FormGroup;
  newsList: News[] = [];
  isEditing = false;
  currentNewsId: number | null = null;
  selectedFile: File | null = null; // For storing the selected file

  constructor(private fb: FormBuilder, private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadNews();
  }

  // Initialize the form
  initializeForm(): void {
    this.newsForm = this.fb.group({
      titulo: ['', [Validators.required]],
      resumen: [''],
      contenido_completo: ['', [Validators.required]],
      imagen: [null], // Field for the image
    });
  }

  // Handle file selection
  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.selectedFile = event.target.files[0];
    }
  }

  // Load news from the service
  loadNews(): void {
    this.noticiasService.getNoticias().subscribe({
      next: (news) => (this.newsList = news),
      error: (err) => console.error('Error al cargar las noticias:', err),
    });
  }

  // Enviar el formulario
submitForm(): void {
  if (this.newsForm.invalid) return;

  const formData = new FormData();
  formData.append('titulo', this.newsForm.get('titulo')?.value);
  formData.append('resumen', this.newsForm.get('resumen')?.value || '');
  formData.append('contenido_completo', this.newsForm.get('contenido_completo')?.value);
  if (this.selectedFile) {
    formData.append('imagen', this.selectedFile); // Adjuntar la imagen
  }

  if (this.isEditing && this.currentNewsId !== null) {
    // Editar noticia existente
    this.noticiasService.updateNoticia(this.currentNewsId, formData).subscribe({
      next: () => {
        this.loadNews();
        this.resetForm();
        alert('Noticia actualizada correctamente.');
      },
      error: (err) => console.error('Error al actualizar la noticia:', err),
    });
  } else {
    // Crear nueva noticia
    this.noticiasService.createNoticia(formData).subscribe({
      next: () => {
        this.loadNews();
        this.resetForm();
        alert('Noticia creada correctamente.');
      },
      error: (err) => console.error('Error al crear la noticia:', err),
    });
  }
}


  // Edit news
  editNews(news: News): void {
    if (news.id === undefined) {
      console.error('El ID de la noticia es inválido o no está definido.');
      return;
    }

    this.isEditing = true;
    this.currentNewsId = news.id;
    this.newsForm.patchValue(news);
  }

  // Delete news
  deleteNews(newsId: number | undefined): void {
    if (!newsId) {
      console.error('El ID de la noticia es inválido o no está definido.');
      return;
    }

    if (confirm('¿Estás seguro de eliminar esta noticia?')) {
      this.noticiasService.deleteNoticia(newsId).subscribe({
        next: () => this.loadNews(),
        error: (err) => console.error('Error al eliminar la noticia:', err),
      });
    }
  }

  // Reset the form
 // Restablecer el formulario
resetForm(): void {
  this.isEditing = false;
  this.currentNewsId = null;
  this.newsForm.reset();
  this.selectedFile = null;

  // Limpiar el input de archivo manualmente
  const fileInput = document.getElementById('imagen') as HTMLInputElement;
  if (fileInput) {
      fileInput.value = '';
  }
}

}
