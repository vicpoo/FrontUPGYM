import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { BottomNavComponent } from '../../component/bottom-nav/bottom-nav.component';
import { PremiumComponent } from '../../component/premium/premium.component'; 
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    BottomNavComponent,
    PremiumComponent, 
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  showPremium = false; // Controla la visibilidad de PremiumComponent
  isPremium = false; // Indica si el usuario es premium

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCurrentUser();
  }

  openPremium(): void {
    this.showPremium = true;
  }

  closePremium(): void {
    this.showPremium = false;
  }

  fetchCurrentUser(): void {
    this.userService.getCurrentUser().subscribe(
      (user: any) => {
        this.isPremium = user.es_premium; // Detecta si el usuario es premium
      },
      (error: any) => {
        console.error('Error fetching user data', error);
      }
    );
  }

  handleAdvancedClick(): void {
    if (this.isPremium) {
      this.router.navigate(['/exercise-avanzado']); // Navega a la ruta avanzada si el usuario es premium
    } else {
      this.openPremium(); // Muestra el modal de premium si no es premium
    }
  }
}
