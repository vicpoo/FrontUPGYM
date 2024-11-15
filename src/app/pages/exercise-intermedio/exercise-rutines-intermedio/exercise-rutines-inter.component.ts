import { Component } from '@angular/core';
import { CommonModule, NgFor, AsyncPipe } from '@angular/common';
import { SidebarComponent } from '../../../component/sidebar/sidebar.component';
import { BottomNavComponent } from '../../../component/bottom-nav/bottom-nav.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-exercise-rutines-inter',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    AsyncPipe,
    SidebarComponent,
    BottomNavComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './exercise-rutines-inter.component.html',
})
export class ExerciserutinesinterComponent {
  exercises = [
    // Example data for testing
    { image: 'path/to/image1.jpg', title: 'Exercise 1' },
    { image: 'path/to/image2.jpg', title: 'Exercise 2' },
  ];
}