import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ejercicio } from '../interfaces/Ejercicio';

@Injectable({
  providedIn: 'root',
})
export class AdminBasicService {
  private readonly BASE_URL = 'http://3.215.146.244:8000';
  private readonly EXERCISE_ENDPOINT = `${this.BASE_URL}/ejercicios/`;

  constructor(private http: HttpClient) {}

  // Obtener todos los ejercicios
  getAllExercises(): Observable<Ejercicio[]> {
    return this.http.get<Ejercicio[]>(this.EXERCISE_ENDPOINT);
  }

  // Crear un nuevo ejercicio
  createExercise(formData: FormData): Observable<Ejercicio> {
    return this.http.post<Ejercicio>(this.EXERCISE_ENDPOINT, formData);
  }

  // Obtener un ejercicio específico por ID
  getExerciseById(id: number): Observable<Ejercicio> {
    return this.http.get<Ejercicio>(`${this.EXERCISE_ENDPOINT}${id}`);
  }

  // Actualizar un ejercicio existente
  updateExercise(id: number, formData: FormData): Observable<Ejercicio> {
    return this.http.put<Ejercicio>(`${this.EXERCISE_ENDPOINT}${id}`, formData);
  }

  deleteExercise(id: number): Observable<void> {
    console.log('Ejercicio a eliminar, ID:', id);  // Verifica que el ID es correcto
    const url = `${this.EXERCISE_ENDPOINT}${id}`;
    console.log('URL para eliminar ejercicio:', url);
    return this.http.delete<void>(url);
    
}

  

  // Crear FormData para enviar datos y archivo de imagen
  createExerciseFormData(
    exercise: Partial<Ejercicio>,
    imageFile?: File
  ): FormData {
    const formData = new FormData();
    formData.append('titulo', exercise.titulo || '');
    formData.append('resumen', exercise.resumen || '');
    formData.append(
      'tiempo_descanso',
      exercise.tiempo_descanso?.toString() || '0'
    );
    formData.append('repeticiones', exercise.repeticiones?.toString() || '0');
    if (imageFile) {
      formData.append('imagen', imageFile);
    }
    return formData;
  }
}
