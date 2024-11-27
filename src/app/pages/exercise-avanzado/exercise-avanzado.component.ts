import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { BottomNavComponent } from '../../component/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-exercise-avanzado',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SidebarComponent,
    BottomNavComponent
  ],
  templateUrl: './exercise.avanzado.component.html',
})
export class ExerciseAvanzadoComponent {

}
