import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../../../component/sidebar/sidebar.component';
import { BottomNavComponent } from '../../../../../component/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-Exercise-admin-ubication',
  standalone: true,
  imports: [RouterModule, SidebarComponent, BottomNavComponent],
  templateUrl: './Exercise-admin-ubication.component.html',
})
export class Exerciseadminubicationcomponent {
  exercises = [
    { id: 1, title: 'BICEPS', image: 'assets/biceps.jpg' },
    { id: 2, title: 'TRICEPS', image: 'assets/triceps.jpg' },
    { id: 3, title: 'HOMBROS', image: 'assets/hombro.jpg' }
  ];

  currentExercise = 0;

  // Propiedad para controlar el modal y la imagen mostrada
  selectedImage: string | null = null;

  // Métodos para cambiar de ejercicio
  nextExercise() {
    this.currentExercise = (this.currentExercise + 1) % this.exercises.length;
  }

  prevExercise() {
    this.currentExercise = (this.currentExercise - 1 + this.exercises.length) % this.exercises.length;
  }

  // Métodos para abrir imágenes desde los botones
  openImage(action: string) {
    if (action === 'edit') {
      this.selectedImage = 'assets/edit-image.jpg'; // Imagen para "Editar"
    } else if (action === 'delete') {
      this.selectedImage = 'assets/delete-image.jpg'; // Imagen para "Eliminar"
    }
  }

  // Método para cerrar el modal
  closeModal() {
    this.selectedImage = null;
  }
}
