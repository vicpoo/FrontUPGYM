import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { HeaderComponent } from '../../header/header.component';
import { BottomNavComponent } from '../../bottom-nav/bottom-nav.component';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterModule, SidebarComponent,HeaderComponent, BottomNavComponent],  
  templateUrl: './exercise-level-basic.component.html',
  styleUrls: ['./exercise-level-basic.component.css']
})
export class ExerciseLevelBasicomponent {}
