import { Component } from '@angular/core';
import { AnuncioService } from '../../../services/anuncio.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BottomNavAdminComponent } from '../../../component/bottom-nav-admin/bottom-nav.component';
import { SidebarAdminComponent } from '../../../component/sidebar-Admin/sidebar-admin.component';

@Component({
  selector: 'app-anuncio-form',
  standalone: true,
  templateUrl: './anuncio-form.component.html',
  providers: [AnuncioService],
  imports: [ReactiveFormsModule, CommonModule, BottomNavAdminComponent, SidebarAdminComponent],
})
export class AnuncioFormComponent {
  anuncioForm: FormGroup;
  anuncios: any[] = []; // Lista de anuncios
  anuncioId: number | null = null;
  isUpdate: boolean = false;

  constructor(
    private fb: FormBuilder,
    private anuncioService: AnuncioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.anuncioForm = this.fb.group({
      imagen: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadAnuncios(); // Carga todos los anuncios al iniciar
    const anuncioId = this.route.snapshot.paramMap.get('id');
    if (anuncioId) {
      this.anuncioId = +anuncioId;
      this.isUpdate = true;
      this.loadAnuncio();
    }
  }

  loadAnuncio(): void {
    if (this.anuncioId !== null) {
      this.anuncioService.getAnuncio(this.anuncioId).subscribe({
        next: (data) => {
          console.log('Anuncio cargado:', data);
        },
        error: (error) => {
          alert('Error al cargar el anuncio.');
        },
      });
    }
  }

  loadAnuncios(): void {
    this.anuncioService.getAnuncios().subscribe({
      next: (data) => {
        this.anuncios = data;
      },
      error: (error) => {
        alert('Error al cargar los anuncios.');
      },
    });
  }

  onSubmit(): void {
    if (this.anuncioForm.invalid) {
      return;
    }

    const formData = new FormData();
    const file = this.anuncioForm.get('imagen')?.value;
    if (file) {
      formData.append('imagen', file, file.name);
    }

    if (this.isUpdate && this.anuncioId !== null) {
      this.anuncioService.updateAnuncio(this.anuncioId, formData).subscribe({
        next: () => {
          alert('Anuncio actualizado con éxito.');
          this.router.navigate(['/anuncios']);
          this.loadAnuncios();
        },
        error: () => {
          alert('Error al actualizar el anuncio.');
        },
      });
    } else {
      this.anuncioService.createAnuncio(formData).subscribe({
        next: () => {
          alert('Anuncio creado con éxito.');
          this.loadAnuncios();
        },
        error: () => {
          alert('Error al crear el anuncio.');
        },
      });
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.anuncioForm.patchValue({ imagen: file });
    }
  }

  deleteAnuncio(id: number): void {
    this.anuncioService.deleteAnuncio(id).subscribe({
      next: () => {
        alert('Anuncio eliminado con éxito.');
        this.loadAnuncios();
      },
      error: () => {
        alert('Error al eliminar el anuncio.');
      },
    });
  }
}
