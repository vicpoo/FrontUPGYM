export interface Post {
  id: number;
  descripcion: string;
  imagen: string | null; // En formato Base64 o null
  usuario_id: number;
  fechaCreacion?: string; // Fecha de creación opcional
  usuario?: {
    nombre_usuario: string; // Nombre del usuario
    foto_perfil: string | null; // Foto de perfil en formato Base64 o null
  };
}
