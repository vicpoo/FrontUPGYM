export interface Post {
  id: number;
  descripcion: string;
  imagen: string | null;
  usuario_id: number;
  fechaCreacion?: string; // Propiedad opcional para la fecha de creación
}
