export interface Ejercicio {
    id: number;
    titulo: string;
    resumen: string;
    nivel_id: number;
    tiempo_descanso: number;
    repeticiones: number;
    ubicacion_id: number;
    imagen?: string | null;
  }
  