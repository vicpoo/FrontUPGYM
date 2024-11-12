import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { HeaderComponent } from '../../component/header/header.component';
import { BottomNavComponent } from '../../component/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-exercise-level-basic',
  standalone: true,
  imports: [RouterModule, SidebarComponent, HeaderComponent, BottomNavComponent],
  templateUrl: './exercise-level-basic.component.html',
  styleUrls: ['./exercise-level-basic.component.css']
})
export class ExerciseLevelBasicomponent {
  exercises = [
    { id: 1, title: 'BICEPS', image: 'assets/biceps.jpg' },
    { id: 2, title: 'TRICEPS', image: 'assets/triceps.jpg' },
    { id: 3, title: 'HOMBROS', image: 'assets/hombro.jpg' }
  ];

  currentExercise = 0;

  nextExercise() {
    this.currentExercise = (this.currentExercise + 1) % this.exercises.length;
  }

  prevExercise() {
    this.currentExercise = (this.currentExercise - 1 + this.exercises.length) % this.exercises.length;
  }
}
