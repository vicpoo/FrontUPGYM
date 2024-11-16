import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importación necesaria para [(ngModel)]
import { SidebarComponent } from '../../component/sidebar/sidebar.component'; // Ajusta la ruta según tu estructura
import { BottomNavComponent } from '../../component/bottom-nav/bottom-nav.component'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, BottomNavComponent], // Agregar FormsModule aquí
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  isEditModalOpen = false;
  user: any = {
    name: '',
    description: '',
    bio: '',
    followers: 0,
    posts: [],
  };

  constructor() {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    // Simulación de carga de datos del usuario
    this.user = {
      name: 'John Doe',
      description: 'Descripción del perfil',
      bio: 'Bio del usuario',
      followers: 100,
      posts: [
        { image: 'assets/post1.jpg', likes: 10 },
        { image: 'assets/post2.jpg', likes: 20 },
      ],
    };
  }

  openEditModal(): void {
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  saveChanges(): void {
    console.log('Guardando cambios del perfil:', this.user);
    alert('Perfil actualizado correctamente.');
    this.closeEditModal();
  }
}
