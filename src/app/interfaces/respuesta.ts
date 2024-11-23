export interface Respuesta {
    id: number;
    contenido: string;
    question_id: number; // Este campo debe existir
    usuario_id: number;
    usuario_nombre?: string;
    usuario_foto?: string;
    fecha_creacion?: Date;
  }
  