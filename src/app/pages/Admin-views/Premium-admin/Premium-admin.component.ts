import { Component, OnInit } from '@angular/core';
import { PremiumService } from '../../../services/Premium.service';
import { SidebarAdminComponent } from '../../../component/sidebar-Admin/sidebar-admin.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BottomNavAdminComponent } from '../../../component/bottom-nav-admin/bottom-nav.component';

@Component({
  selector: 'app-premiumAdmin',
  standalone: true,
  imports: [
    SidebarAdminComponent,
    CommonModule,
    ReactiveFormsModule,
    BottomNavAdminComponent,
  ],
  templateUrl: './Premium-admin.component.html',
})
export class PremiumAdminComponent implements OnInit {
  users: any[] = []; // Lista de usuarios cargada desde la API
  loading: boolean = false; // Estado de carga para la vista

  constructor(private premiumService: PremiumService) {}

  ngOnInit(): void {
    this.loadUsers(); // Cargar los usuarios al inicializar el componente
  }

  // Cargar la lista de usuarios
  loadUsers(): void {
    this.loading = true;
    this.premiumService.getUsers().subscribe({
      next: (data) => {
        this.users = data; // Guardar los usuarios obtenidos
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        alert('Hubo un error al cargar la lista de usuarios.');
        this.loading = false;
      },
    });
  }

  // Alternar el estado de premium
  togglePremium(user: any): void {
    const newStatus = !user.es_premium; // Alternar el estado actual
    this.premiumService.updateEsPremium(user.id, newStatus).subscribe({
      next: () => {
        user.es_premium = newStatus; // Actualizar visualmente el estado
        alert(
          `El estado de Premium de ${user.nombre_usuario} se actualizó correctamente.`
        );
      },
      error: (err) => {
        console.error('Error al actualizar premium:', err);
        alert('Hubo un error al actualizar el estado de Premium.');
      },
    });
  }
}
