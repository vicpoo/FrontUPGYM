import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { BottomNavComponent } from '../../component/bottom-nav/bottom-nav.component';
import { CardStackComponent } from '../../component/CardStack/card-stack.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-Search',
  standalone: true,
  imports: [
    SidebarComponent,
    BottomNavComponent,
    CardStackComponent,
    NgIf,
    NgFor,
    FormsModule,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class searchComponent {
  query: string = ''; // Cadena de búsqueda
  results: any[] = []; // Resultados de búsqueda
  isLoading: boolean = false; // Estado de carga

  constructor(private userService: UserService) {}

  // Método para buscar usuarios
  errorMessage: string = '';

  search(): void {
    if (!this.query.trim()) {
      this.results = [];
      return;
    }
  
    this.isLoading = true;
    this.userService.searchUsers(this.query, 5).subscribe(
      (data) => {
        this.results = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al realizar la búsqueda:', error);
        this.errorMessage = 'Ocurrió un error al realizar la búsqueda.';
        this.isLoading = false;
      }
    );
  }
}  
