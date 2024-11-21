import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { BottomNavComponent } from '../../component/bottom-nav/bottom-nav.component';
import { PremiumComponent } from '../../component/premium/premium.component'; // Importar PremiumComponent
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    BottomNavComponent,
    PremiumComponent, // Registrar PremiumComponent
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent {
  showPremium = false; // Controla la visibilidad de PremiumComponent

  openPremium(): void {
    this.showPremium = true;
  }

  closePremium(): void {
    this.showPremium = false;
  }
}