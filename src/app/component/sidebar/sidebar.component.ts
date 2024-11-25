import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  currentUser: { name: string; foto_perfil: string; es_premium: boolean } | null = null;
  showMenu: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCurrentUser();
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  fetchCurrentUser(): void {
    this.userService.getCurrentUser().subscribe(
      (user: any) => {
        this.currentUser = {
          name: user.nombre_usuario,
          foto_perfil: user.foto_perfil || 'assets/default-user.png',
          es_premium: user.es_premium, // Detectamos si el usuario es premium
        };
      },
      (error: any) => {
        console.error('Error fetching user data', error);
      }
    );
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
