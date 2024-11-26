import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RespuestaService, Respuesta } from '../../services/respuesta.service';
import { QuestionService } from '../../services/question.service';
import { UserService } from '../../services/user.service'; // Importamos el servicio de usuario

@Component({
  standalone: true,
  selector: 'app-respuesta',
  templateUrl: './respuesta.component.html',
  imports: [CommonModule, FormsModule],
})
export class RespuestaComponent implements OnInit, OnChanges {
  @Input() preguntaId!: number; // Recibir el ID de la pregunta desde el padre
  @Output() close = new EventEmitter<void>(); // Agregamos el EventEmitter para el cierre

  question: any = null; // Datos de la pregunta
  respuestas: Respuesta[] = []; // Lista de respuestas asociadas
  nuevaRespuesta: Respuesta = {
    contenido: '',
    pregunta_id: 0,
    usuario_id: 0, // Aquí se actualizará dinámicamente
  };

  usuarioId: number | null = null; // Almacenaremos el id del usuario logueado
  limite = 5; // Cantidad inicial de respuestas mostradas

  constructor(
    private respuestaService: RespuestaService,
    private questionService: QuestionService,
    private userService: UserService // Inyectamos el servicio de usuario
  ) {}

  ngOnInit(): void {
    if (this.preguntaId) {
      this.obtenerQuestion();
      this.obtenerRespuestas();
      this.obtenerUsuarioId(); // Cargar el ID del usuario al iniciar
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['preguntaId']?.currentValue) {
      this.limite = 5; // Reinicia el límite de respuestas
      this.respuestas = [];
      this.question = null;
      this.obtenerQuestion();
      this.obtenerRespuestas();
    }
  }

  obtenerUsuarioId(): void {
    // Cargar el usuario logueado
    this.userService.getCurrentUser().subscribe(
      (user) => {
        this.usuarioId = user.id; // Asignamos el id del usuario
        this.nuevaRespuesta.usuario_id = user.id; // Asignamos el usuario id para las nuevas respuestas
      },
      (error) => {
        console.error('Error al cargar el usuario:', error);
      }
    );
  }

  obtenerQuestion(): void {
    this.questionService.getQuestionById(this.preguntaId).subscribe(
      (data) => {
        this.question = data; // Asignar los datos de la pregunta
      },
      (error) => {
        console.error('Error al obtener la pregunta:', error);
      }
    );
  }

  obtenerRespuestas(): void {
    this.respuestaService.getRespuestasByQuestion(this.preguntaId).subscribe(
      (data) => {
        this.respuestas = data; // Asignar las respuestas recibidas
        // Aseguramos que las respuestas tengan la foto y nombre del usuario
        this.respuestas = this.respuestas.map((respuesta) => ({
          ...respuesta,
          usuario_foto: respuesta.usuario?.foto_perfil
            ? `data:image/jpeg;base64,${respuesta.usuario.foto_perfil}`
            : 'assets/default-avatar.jpg',
          usuario_nombre: respuesta.usuario?.nombre_usuario || 'Usuario desconocido',
        }));
      },
      (error) => {
        console.error('Error al obtener las respuestas:', error);
      }
    );
  }

  crearRespuesta(): void {
    if (!this.usuarioId) {
      console.error('Usuario no autenticado.');
      return;
    }

    this.nuevaRespuesta.pregunta_id = this.preguntaId;

    this.respuestaService.createRespuesta(this.nuevaRespuesta).subscribe(
      (data) => {
        this.respuestas.unshift(data); // Añadir la respuesta al inicio de la lista
        this.nuevaRespuesta.contenido = ''; // Limpiar el formulario
      },
      (error) => {
        console.error('Error al crear la respuesta:', error);
      }
    );
  }

  verMasRespuestas(): void {
    this.limite += 5; // Incrementar el límite para mostrar más respuestas
  }
}
