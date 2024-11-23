import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core'; // Agregamos Output y EventEmitter
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RespuestaService, Respuesta } from '../../services/respuesta.service';
import { QuestionService } from '../../services/question.service';

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
    usuario_id: 1,
  };

  limite = 5; // Cantidad inicial de respuestas mostradas
  cargando = false;

  constructor(
    private respuestaService: RespuestaService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    if (this.preguntaId) {
      this.obtenerQuestion();
      this.obtenerRespuestas();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['preguntaId'] && changes['preguntaId'].currentValue) {
      this.limite = 3; // Reinicia el límite de respuestas
      this.respuestas = []; // Limpia las respuestas previas
      this.question = null; // Limpia la pregunta previa
      this.obtenerQuestion(); // Carga la nueva pregunta
      this.obtenerRespuestas(); // Carga las respuestas de la nueva pregunta
    }
  }

  obtenerQuestion(): void {
    this.questionService.getQuestionById(this.preguntaId).subscribe(
      (data) => {
        console.log('Pregunta recibida:', data); // Depuración
        this.question = data;
      },
      (error) => {
        console.error('Error al obtener la pregunta:', error);
      }
    );
  }

  obtenerRespuestas(): void {
    this.respuestaService.getRespuestasByQuestion(this.preguntaId).subscribe(
      (data) => {
        console.log('Respuestas recibidas:', data); // Depuración
        this.respuestas = data;
      },
      (error) => {
        console.error('Error al obtener las respuestas:', error);
      }
    );
  }

  crearRespuesta(): void {
    this.nuevaRespuesta.pregunta_id = this.preguntaId;

    this.respuestaService.createRespuesta(this.nuevaRespuesta).subscribe(
      (data) => {
        this.respuestas.unshift(data);
        this.nuevaRespuesta.contenido = '';
      },
      (error) => {
        console.error('Error al crear la respuesta:', error);
      }
    );
  }

  verMasRespuestas(): void {
    this.limite += 5;
  }
}
