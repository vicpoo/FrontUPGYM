import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { Observable } from 'rxjs';
import { PorcentajeGrasa } from '../../../interfaces/PorcentajeGrasa';
import { PorcentajeGrasaService } from '../../../services/PorcentajeGrasa.service';
import { SidebarComponent } from '../../../component/sidebar/sidebar.component';
import { BottomNavComponent } from '../../../component/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-porcentaje-grasa',
  templateUrl: './porcentaje-grasa.component.html',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent, BottomNavComponent],
})
export class PorcentajeGrasaComponent {
  form: FormGroup;
  registros$: Observable<PorcentajeGrasa[]> | null = null;

  constructor(
    private fb: FormBuilder,
    private porcentajeGrasaService: PorcentajeGrasaService
  ) {
    this.form = this.fb.group({
      altura: ['', [Validators.required, Validators.min(50)]],
      cintura: ['', [Validators.required, Validators.min(20)]],
      genero: ['HOMBRE', Validators.required],  // El valor por defecto es 'HOMBRE'
    });
    

    this.obtenerHistorial();
  }

  obtenerHistorial(): void {
    this.registros$ = this.porcentajeGrasaService.getHistorial();
  }

  calcularGrasa(): void {
    if (this.form.invalid) return;
  
    const { altura, cintura, genero } = this.form.value;
    let resultado: number;
  
    // Calcular el resultado según el género
    if (genero === 'HOMBRE') {
      resultado = 64 - (20 * (altura / 100) / cintura);
    } else if (genero === 'MUJER') {
      resultado = 76 - (20 * (altura / 100) / cintura);
    } else {
      alert('Género no válido');
      return;
    }
  
    // Añadir el resultado calculado al objeto de datos antes de enviarlo
    const registro = { ...this.form.value, resultado };
  
    this.porcentajeGrasaService.crearRegistro(registro).subscribe(() => {
      this.obtenerHistorial();
      alert('Registro guardado exitosamente');
    });
  }
  


  
  
}
