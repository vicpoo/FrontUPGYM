export interface News {
  id?: number; // Opcional porque no está disponible al crear
  titulo: string;
  resumen?: string;
  contenido_completo: string;
  imagen: string; // Campo para la URL de la imagen
}
