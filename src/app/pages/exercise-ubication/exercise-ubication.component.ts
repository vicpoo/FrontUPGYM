import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { BottomNavComponent } from '../../component/bottom-nav/bottom-nav.component';


@Component({
  selector: 'app-exercise-ubication',
  standalone: true,
  imports: [RouterModule, SidebarComponent, BottomNavComponent],  
  templateUrl: './exercise-ubication.component.html',
  styleUrls: ['./exercise-ubication.component.css']
})
export class ExerciseUbicationComponent {}
