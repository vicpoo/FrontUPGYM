import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Para NgIf
import { ReactiveFormsModule } from '@angular/forms'; // Para formGroup
import { SidebarComponent } from '../../../component/sidebar/sidebar.component';
import { BottomNavComponent } from '../../../component/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-imc',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SidebarComponent,
    BottomNavComponent
  ],
  templateUrl: './imc.component.html',
})
export class ImcComponent {
  form: FormGroup;
  registros: Array<{ id: number; altura: number; peso: number; genero: string; imc: number }> = [];
  nextId = 1;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      altura: ['', [Validators.required, Validators.min(50)]],
      peso: ['', [Validators.required, Validators.min(1)]],
      genero: ['HOMBRE', Validators.required],
    });
  }

  calcularIMC(): void {
    if (this.form.valid) {
      const { altura, peso, genero } = this.form.value;
      const alturaMetros = altura / 100; // Convertir a metros
      const imc = +(peso / (alturaMetros ** 2)).toFixed(2); // Cálculo del IMC redondeado a 2 decimales

      this.registros.push({
        id: this.nextId++,
        altura,
        peso,
        genero,
        imc,
      });

      this.form.reset({ genero: 'HOMBRE' }); // Reinicia el formulario con el género predeterminado
    }
  }
}
