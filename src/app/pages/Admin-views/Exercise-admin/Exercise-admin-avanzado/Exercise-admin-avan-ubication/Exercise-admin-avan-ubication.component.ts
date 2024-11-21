import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para *ngFor y otras directivas comunes
import { SidebarComponent } from '../../../../../component/sidebar/sidebar.component';
import { BottomNavComponent } from '../../../../../component/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-Exercise-admin-avan-ubication',
  standalone: true,
  imports: [RouterModule, CommonModule, SidebarComponent, BottomNavComponent],
  templateUrl: './Exercise-admin-avan-ubication.component.html',
})
export class Exerciseadminavanubicationcomponent {
  exercisesHome = [
    { id: 1, title: 'Sentadillas', image: 'assets/biceps.jpg' },
    { id: 2, title: 'Plancha', image: 'assets/hombro.jpg' },
  ];

  exercisesGym = [
    { id: 3, title: 'Press Banca', image: 'assets/hombro.jpg' },
    { id: 4, title: 'Peso Muerto', image: 'assets/biceps.jpg' },
  ];

  editExercise(type: 'home' | 'gym', id: number) {
    console.log(`Editando ejercicio ${type} con id ${id}`);
    // Lógica de edición
    alert(`Ejercicio ${id} de ${type} listo para edición.`);
  }

  deleteExercise(type: 'home' | 'gym', id: number) {
    console.log(`Eliminando ejercicio ${type} con id ${id}`);
    if (type === 'home') {
      this.exercisesHome = this.exercisesHome.filter((exercise) => exercise.id !== id);
    } else {
      this.exercisesGym = this.exercisesGym.filter((exercise) => exercise.id !== id);
    }
    alert(`Ejercicio ${id} de ${type} eliminado.`);
  }

  addExercise(type: 'home' | 'gym') {
    console.log(`Agregando nuevo ejercicio a ${type}`);
    const newExercise = {
      id: Date.now(), // Generar un id único
      title: `Nuevo Ejercicio ${type}`,
      image: 'assets/default.jpg', // Imagen por defecto
    };
    if (type === 'home') {
      this.exercisesHome.push(newExercise);
    } else {
      this.exercisesGym.push(newExercise);
    }
    alert(`Ejercicio agregado a ${type}.`);
  }
}
