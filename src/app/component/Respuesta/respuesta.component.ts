import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RespuestaService, Respuesta } from '../../services/respuesta.service';
import { QuestionService } from '../../services/question.service';

@Component({
  standalone: true,
  selector: 'app-respuesta',
  templateUrl: './respuesta.component.html',
  imports: [CommonModule, FormsModule], // Importar los módulos necesarios
})
export class RespuestaComponent implements OnInit {
  @Input() preguntaId!: number; // Recibir el ID de la pregunta desde el padre
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

  // Obtener información de la pregunta actual
  obtenerQuestion(): void {
    this.questionService.getQuestionById(this.preguntaId).subscribe(
      (data) => {
        this.question = data;
      },
      (error) => {
        console.error('Error al obtener la pregunta:', error);
      }
    );
  }

  // Obtener respuestas asociadas a la pregunta
  obtenerRespuestas(): void {
    this.cargando = true;
    this.respuestaService.getRespuestasByQuestion(this.preguntaId).subscribe(
      (data) => {
        console.log('Respuestas recibidas:', data); // Agrega logs para depuración
        this.respuestas = data;
        this.cargando = false;
      },
      (error) => {
        console.error('Error al obtener las respuestas:', error);
        this.cargando = false;
      }
    );
  }
  

  // Crear una nueva respuesta
  crearRespuesta(): void {
    this.nuevaRespuesta.pregunta_id = this.preguntaId;

    this.respuestaService.createRespuesta(this.nuevaRespuesta).subscribe(
      (data) => {
        this.respuestas.unshift(data); // Agregar la nueva respuesta al inicio
        this.nuevaRespuesta.contenido = ''; // Limpiar el formulario
      },
      (error) => {
        console.error('Error al crear la respuesta:', error);
      }
    );
  }

  // Mostrar más respuestas
  verMasRespuestas(): void {
    this.limite += 5;
  }
}
