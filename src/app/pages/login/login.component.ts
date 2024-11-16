import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
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
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      nombre_usuario: ['', [Validators.required]], // Validación de nombre de usuario
      contraseña: ['', [Validators.required]], // Validación de contraseña
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Token recibido:', response.access_token); // Verifica si el token se recibe correctamente
          sessionStorage.setItem('token', response.access_token); // Guarda el token en sessionStorage
          alert('Inicio de sesión exitoso. Redirigiendo...');
          this.router.navigate(['/home']); // Redirige al usuario al home
        },
        error: (error) => {
          console.error('Error en el inicio de sesión:', error);
          if (error.status === 401) {
            alert('Credenciales inválidas. Por favor, revisa tu nombre de usuario y contraseña.');
          } else {
            alert('Error en el servidor. Inténtalo nuevamente más tarde.');
          }
        },
      });
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
