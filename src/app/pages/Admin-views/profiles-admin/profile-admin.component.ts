import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Admin } from '../../../interfaces/Admin'; // Importa la interfaz desde el lugar correcto
import { AdminService } from '../../../services/Perfiles-Admin.service'; // Importa el servicio desde la ruta correcta
import { HttpErrorResponse } from '@angular/common/http';
import { SidebarAdminComponent } from '../../../component/sidebar-Admin/sidebar-admin.component';

@Component({
  selector: 'app-profileadmin',
  standalone: true,
  imports: [SidebarAdminComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './profile-admin.component.html',
})
export class ProfileadminComponent implements OnInit {
  adminForm: FormGroup;
  admins: Admin[] = []; // Corregido: Usa la interfaz Admin importada
  isLoading: boolean = false;
  errorMessage: string = '';
  isEditModalOpen: boolean = false; // Variable para controlar el modal
  editAdminForm: FormGroup; // Formulario para editar administrador
  adminToEdit: Admin | null = null; // Administrador a editar

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    // Inicializamos el formulario con validaciones
    this.adminForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
      nombreAdministrador: ['', [Validators.required, Validators.minLength(3)]], // Nueva validación
    });

    // Inicializamos el formulario de edición
    this.editAdminForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      nombreAdministrador: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.fetchAdmins();
  }

  // Obtener lista de administradores
  fetchAdmins(): void {
    this.isLoading = true;
    this.adminService.getAdmins().subscribe({
      next: (data) => {
        this.admins = data;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = 'Error al cargar la lista de administradores.';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  // Crear un nuevo administrador
  addAdmin(): void {
    if (this.adminForm.invalid) {
      this.adminForm.markAllAsTouched(); // Marca todos los controles como tocados
      this.errorMessage = 'Por favor, completa todos los campos obligatorios.';
      return;
    }

    this.isLoading = true;

    this.adminService.createAdmin(this.adminForm.value).subscribe({
      next: (newAdmin) => {
        this.admins.push(newAdmin);
        this.adminForm.reset();
        this.isLoading = false;
        this.errorMessage = '';
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.detail || 'Error al agregar el administrador.';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  // Editar un administrador
  editAdmin(admin: Admin): void {
    this.adminToEdit = admin; // Guardar el administrador a editar
    this.editAdminForm.patchValue({
      nombre: admin.nombre,
      apellido: admin.apellido,
      correo: admin.correo,
      nombreAdministrador: admin.nombre_administrador,
    });
    this.isEditModalOpen = true; // Abrir el modal de edición
  }

  // Actualizar administrador
  updateAdmin(): void {
    if (this.editAdminForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos requeridos.';
      return;
    }

    if (this.adminToEdit && this.adminToEdit.id !== undefined) {
      const updatedAdmin = { ...this.adminToEdit, ...this.editAdminForm.value };

      this.adminService.updateAdmin(this.adminToEdit.id, updatedAdmin).subscribe({
        next: () => {
          const index = this.admins.findIndex((a) => a.id === this.adminToEdit?.id);
          if (index > -1) {
            this.admins[index] = updatedAdmin; // Actualizar la lista local
          }
          this.isEditModalOpen = false; // Cerrar el modal
          this.editAdminForm.reset(); // Resetear formulario
          this.errorMessage = '';
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error?.detail || 'Error al actualizar el administrador.';
          console.error(err);
        },
      });
    } else {
      this.errorMessage = 'Error: El administrador no tiene un ID válido.';
    }
  }

  // Cerrar el modal de edición
  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editAdminForm.reset();
  }

  // Eliminar un administrador
  deleteAdmin(adminId: number): void {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este administrador?');
    if (!confirmDelete) return;

    this.isLoading = true;

    this.adminService.deleteAdmin(adminId).subscribe({
      next: () => {
        this.admins = this.admins.filter((admin) => admin.id !== adminId);
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.detail || 'Error al eliminar el administrador.';
        this.isLoading = false;
        console.error(err);
      },
    });
  }
}
