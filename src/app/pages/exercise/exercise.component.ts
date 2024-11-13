import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { HeaderComponent } from '../../component/header/header.component';
import { BottomNavComponent } from '../../component/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent, BottomNavComponent],
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent {}
