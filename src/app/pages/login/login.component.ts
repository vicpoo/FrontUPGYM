import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AdminService } from '../../services/Perfiles-Admin.service'; // Importación del AdminService
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule para *ngIf
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule para formGroup

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Agrega los módulos necesarios
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private adminService: AdminService, // Inyecta AdminService
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      nombre_usuario: ['', [Validators.required]], // Validación de nombre de usuario
      contraseña: ['', [Validators.required]], // Validación de contraseña
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const input = this.loginForm.value.nombre_usuario; // Puede ser nombre_usuario o correo
      const contraseña = this.loginForm.value.contraseña;

      if (this.isEmail(input)) {
        // Si es correo, enviar al endpoint de AdminService
        this.loginAsAdmin({ correo: input, contraseña });
      } else {
        // Si es nombre de usuario, enviar al endpoint de UserService
        this.loginAsUser({ nombre_usuario: input, contraseña });
      }
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

  // Método para verificar si la entrada es un correo
  private isEmail(input: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correos
    return emailRegex.test(input);
  }

  // Login para administradores
  private loginAsAdmin(credentials: { correo: string; contraseña: string }): void {
    this.adminService.adminLogin(credentials).subscribe({
      next: (response: any) => { // Especifica el tipo de respuesta
        console.log('Token de admin recibido:', response.access_token);
        sessionStorage.setItem('token', response.access_token);
        alert('Inicio de sesión como administrador exitoso. Redirigiendo...');
        this.router.navigate(['/profile-admin']); // Redirige a la vista de administradores
      },
      error: (error: any) => { // Especifica el tipo de error
        console.error('Error en el inicio de sesión como administrador:', error);
        alert('Credenciales de administrador inválidas o error en el servidor.');
      },
    });
  }

  // Login para usuarios
  private loginAsUser(credentials: { nombre_usuario: string; contraseña: string }): void {
    this.userService.login(credentials).subscribe({
      next: (response: any) => { // Especifica el tipo de respuesta
        console.log('Token de usuario recibido:', response.access_token);
        sessionStorage.setItem('token', response.access_token);
        alert('Inicio de sesión como usuario exitoso. Redirigiendo...');
        this.router.navigate(['/home']); // Redirige a la vista de usuarios
      },
      error: (error: any) => { // Especifica el tipo de error
        console.error('Error en el inicio de sesión como usuario:', error);
        alert('Credenciales de usuario inválidas o error en el servidor.');
      },
    });
  }
}
