import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface News {
  title: string;
  description?: string;
  imageUrl: string;
  isFeatured?: boolean;
}

@Component({
  selector: 'app-card-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-stack.component.html',
})
export class CardStackComponent {
  news: News[] = [
    {
      title: 'El entrenamiento perfecto para ganar músculo rápidamente',
      description: 'Descubre una rutina intensiva de entrenamiento que promete ganancias musculares en poco tiempo.',
      imageUrl: 'assets/noticia1.jpg',
      isFeatured: true, 
    },
    {
      title: '¿Cuánto cardio es ideal para quemar grasa?',
      imageUrl: 'assets/noticia2.jpg',
      description: 'Conoce el equilibrio perfecto entre cardio y entrenamiento de fuerza para perder grasa.',
    },
    {
      title: 'Los beneficios de entrenar en ayunas',
      imageUrl: 'assets/noticia3.jpg',
      description: '¿Es realmente efectivo? Descubre cómo el ayuno puede impactar tu rendimiento.',
    },
    {
      title: 'Alimentos ricos en proteínas para ganar masa muscular',
      imageUrl: 'assets/noticia4.jpg',
      description: 'Una lista de los mejores alimentos para aumentar la masa muscular de forma saludable.',
    },
    {
      title: 'Los errores más comunes al hacer sentadillas',
      imageUrl: 'assets/noticia5.jpg',
      description: 'Evita lesiones y maximiza resultados corrigiendo estos errores frecuentes.',
    },
    {
      title: '¿Cuánto descanso necesitas entre entrenamientos?',
      imageUrl: 'assets/noticia6.jpg',
      description: 'Descubre la importancia del descanso para optimizar el crecimiento muscular y rendimiento.',
    },
    {
      title: 'Los mitos sobre el consumo de suplementos',
      imageUrl: 'assets/noticia8.jpg',
      description: '¿Son realmente necesarios los suplementos? Analizamos los mitos y verdades.',
    },
    {
      title: 'Cómo evitar el sobreentrenamiento',
      imageUrl: 'assets/noticia9.jpg',
      description: 'Conoce los signos de sobreentrenamiento y cómo recuperarte de manera adecuada.',
    },
    {
      title: 'Los mejores ejercicios para abdomen en casa',
      imageUrl: 'assets/noticia10.jpg',
      description: 'Una rutina de ejercicios para fortalecer el abdomen sin necesidad de equipo.',
    },
    {
      title: 'La importancia de la hidratación durante el entrenamiento',
      imageUrl: 'assets/noticia11.jpg',
      description: 'Entérate de cómo la hidratación afecta tu rendimiento y recuperación.',
    }
  ];  
}
