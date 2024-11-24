import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf

@Component({
  selector: 'app-sidebar-Admin',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule], // Add CommonModule here
  templateUrl: './sidebar-Admin.component.html',
})
export class SidebarAdminComponent implements OnInit {
  currentUser: { name: string; foto_perfil: string } | null = null;
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
