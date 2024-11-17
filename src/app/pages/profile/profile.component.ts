import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para ngModel
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { BottomNavComponent } from '../../component/bottom-nav/bottom-nav.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, // Asegúrate de importar FormsModule
    SidebarComponent, 
    BottomNavComponent
  ],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  isEditModalOpen = false;
  user: any = {
    id: null,
    name: '',
    correo: '',
    description: '',
    foto_perfil: '',
    followers: 0,
  };
  selectedImage: File | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getCurrentUser().subscribe({
      next: (data) => {
        this.user = {
          id: data.id,
          name: data.nombre_usuario,
          correo: data.correo,
          description: data.descripcion || 'Sin descripción',
          foto_perfil: data.foto_perfil
            ? `data:image/jpeg;base64,${data.foto_perfil}`
            : '/customIDfoto', // Imagen predeterminada
        };
        console.log('Perfil cargado:', this.user);
      },
      error: (err) => {
        console.error('Error al cargar el perfil:', err);
      },
    });
  }

  openEditModal(): void {
    // Cargamos los valores actuales del usuario en el formulario
    this.user = {
      ...this.user,
      name: this.user.name || '',
      description: this.user.description || '',
      foto_perfil: this.user.foto_perfil || '/customIDfoto',
    };
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedImage = null;
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.foto_perfil = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveChanges(): void {
    const formData = new FormData();
    formData.append('nombre_usuario', this.user.name);
    formData.append('descripcion', this.user.description);
    if (this.selectedImage) {
      formData.append('foto_perfil', this.selectedImage);
    }

    this.userService.updateUser(this.user.id, formData).subscribe({
      next: () => {
        alert('Perfil actualizado correctamente.');
        this.closeEditModal();
      },
      error: (err) => {
        console.error('Error al actualizar el perfil:', err);
        alert('No se pudo actualizar el perfil.');
      },
    });
  }
}
