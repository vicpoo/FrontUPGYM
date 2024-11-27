import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { BottomNavComponent } from '../../component/bottom-nav/bottom-nav.component';
import { RouterLink } from '@angular/router';
import { AdminAvanzadoCasaService } from '../../services/AdminAvanzadoCasa.service';

@Component({
  selector: 'app-exercise-routines',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, SidebarComponent, BottomNavComponent, RouterLink],
  templateUrl: './exercise-avan-casa.html',
})
export class ExerciseavancasaComponent implements OnInit {
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

  
}
