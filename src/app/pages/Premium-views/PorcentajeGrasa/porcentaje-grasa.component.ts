import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SidebarComponent } from '../../../component/sidebar/sidebar.component';
import { CommonModule } from '@angular/common'; // Para NgIf
import { ReactiveFormsModule } from '@angular/forms'; // Para formGroup
import { BottomNavComponent } from '../../../component/bottom-nav/bottom-nav.component';


@Component({
  selector: 'app-grasa-corporal',
  standalone: true,
  imports: [SidebarComponent,CommonModule,ReactiveFormsModule,BottomNavComponent  ],
  templateUrl: './porcentaje-grasa.component.html',
})
export class PorcentajeGrasaComponent {
  form: FormGroup;
  registros: Array<{ altura: number; cintura: number; genero: string; resultado: number }> = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      altura: ['', [Validators.required, Validators.min(50)]],
      cintura: ['', [Validators.required, Validators.min(20)]],
      genero: ['HOMBRE', Validators.required],
    });
  }

  calcularGrasa(): void {
    if (this.form.invalid) return;

    const { altura, cintura, genero } = this.form.value;
    let resultado: number;

    if (genero === 'HOMBRE') {
      resultado = 64 - (20 * altura) / cintura;
    } else if (genero === 'MUJER') {
      resultado = 76 - (20 * altura) / cintura;
    } else {
      alert('Género no válido');
      return;
    }

    this.registros.push({ altura, cintura, genero, resultado });
    alert('Cálculo realizado y guardado en el historial');
  }
}
