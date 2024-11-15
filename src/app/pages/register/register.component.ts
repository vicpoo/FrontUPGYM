import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      // Mapeo de campos a los nombres esperados por la API
      const user = {
        nombre_usuario: this.registerForm.get('username')?.value,
        correo: this.registerForm.get('email')?.value,
        contraseña: this.registerForm.get('password')?.value,
      };

      this.userService.createUser(user).subscribe({
        next: (response) => {
          console.log('Usuario registrado:', response);
          alert('Usuario registrado exitosamente');
          this.router.navigate(['/home']); // Redirige al usuario a la vista /home
        },
        error: (error) => {
          console.error('Error al registrar usuario:', error);
          alert('Error al registrar el usuario');
        },
      });
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
