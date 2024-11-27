import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { AdminAvanzadoCasaService } from '../../../../../services/AdminAvanzadoCasa.service';
import { SidebarAdminComponent } from '../../../../../component/sidebar-Admin/sidebar-admin.component';
import { BottomNavAdminComponent } from '../../../../../component/bottom-nav-admin/bottom-nav.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-exercise-routines',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, SidebarAdminComponent, BottomNavAdminComponent, RouterLink],
  templateUrl: './Exercise-admin-avanzado-casa.component.html',
})
export class ExerciseAdminAvanzadoCasaComponent implements OnInit {
  exercises: any[] = [];
  showModal: boolean = false;
  isEditing: boolean = false;
  currentExercise: any = {
    titulo: '',
    resumen: '',
    tiempo_descanso: 0,
    repeticiones: 0,
    imagen: null,
  };
  selectedImage: File | undefined = undefined;

  constructor(private adminAvanzadoCasaService: AdminAvanzadoCasaService) {}

  ngOnInit(): void {
    this.loadExercises();
  }

  // Cargar todos los ejercicios
  loadExercises(): void {
    this.adminAvanzadoCasaService.getAllExercises().subscribe({
      next: (data: any[]) => {
        this.exercises = data;
      },
      error: (err: any) => {
        console.error('Error al cargar ejercicios:', err);
      },
    });
  }

  // Abrir modal para agregar ejercicio
  openAddModal(): void {
    this.isEditing = false;
    this.currentExercise = {
      titulo: '',
      resumen: '',
      tiempo_descanso: 0,
      repeticiones: 0,
      imagen: null,
    };
    this.selectedImage = undefined;
    this.showModal = true;
  }

  // Abrir modal para editar ejercicio
  openEditModal(exercise: any): void {
    this.isEditing = true;
    this.currentExercise = { 
      id: exercise.id, 
      titulo: exercise.titulo, 
      resumen: exercise.resumen, 
      tiempo_descanso: exercise.tiempo_descanso, 
      repeticiones: exercise.repeticiones,
      imagen: exercise.imagen 
    };
    this.selectedImage = undefined;
    this.showModal = true;
  }

  // Cerrar modal
  closeModal(): void {
    this.showModal = false;
  }

  // Guardar ejercicio
  saveExercise(): void {
    const formData = this.adminAvanzadoCasaService.createExerciseFormData(
      {
        titulo: this.currentExercise.titulo,
        resumen: this.currentExercise.resumen,
        tiempo_descanso: this.currentExercise.tiempo_descanso,
        repeticiones: this.currentExercise.repeticiones,
      },
      this.selectedImage
    );

    if (this.isEditing) {
      // Actualizar ejercicio existente
      this.adminAvanzadoCasaService.updateExercise(this.currentExercise.id, formData).subscribe({
        next: (updatedExercise) => {
          this.exercises = this.exercises.map((exercise) =>
            exercise.id === updatedExercise.id ? updatedExercise : exercise
          );
          this.closeModal();
        },
        error: (err: any) => {
          console.error('Error al actualizar el ejercicio:', err);
        },
      });
    } else {
      // Crear nuevo ejercicio
      this.adminAvanzadoCasaService.createExercise(formData).subscribe({
        next: (newExercise) => {
          this.exercises.push(newExercise);
          this.closeModal();
        },
        error: (err: any) => {
          console.error('Error al agregar el ejercicio:', err);
        },
      });
    }
  }

 // Eliminar ejercicio
deleteExercise(exerciseId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este ejercicio?')) {
      this.adminAvanzadoCasaService.deleteExercise(exerciseId).subscribe({
        next: () => {
          this.exercises = this.exercises.filter((exercise) => exercise.id !== exerciseId);
        },
        error: (err: any) => {
          console.error('Error al eliminar ejercicio:', err);
        },
      });
    }
  }
  

  // Seleccionar imagen
  onImageSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }
}
