import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../component/sidebar/sidebar.component';
import { BottomNavComponent } from '../../../component/bottom-nav/bottom-nav.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-exercise-admin-level',
  standalone: true,
  imports: [CommonModule, SidebarComponent, BottomNavComponent,RouterLink, RouterLinkActive],
  templateUrl: './exercise-admin-level.component.html',
})
export class ExerciseAdminLevelComponent {}
