import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarAdminComponent } from '../../../../component/sidebar-Admin/sidebar-admin.component';
import { BottomNavAdminComponent } from '../../../../component/bottom-nav-admin/bottom-nav.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-exercise-admin-avanzado-ubication',
  standalone: true,
  imports: [CommonModule, SidebarAdminComponent, BottomNavAdminComponent,RouterLink],
  templateUrl: './exercise-admin-avanzado.component.html',
})
export class ExerciseAdminUbicasionComponent {}
