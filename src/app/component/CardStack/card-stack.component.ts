import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiasService } from '../../services/noticias.service';
import { News } from '../../interfaces/news';

@Component({
  selector: 'app-card-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-stack.component.html',
})
export class CardStackComponent implements OnInit {
  news: News[] = []; // Trabajamos directamente con la interfaz News
  featuredNews: News | null = null; // Noticia destacada

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.loadNews();
  }

  // Cargar noticias desde la API
  loadNews(): void {
    this.noticiasService.getNoticias().subscribe({
      next: (response: News[]) => {
        // Asignar la primera noticia como destacada
        if (response.length > 0) {
          this.featuredNews = response[0]; // La primera noticia es la destacada
          this.news = response.slice(1); // Las demás son noticias secundarias
        } else {
          this.featuredNews = null; // Si no hay noticias, no hay destacada
          this.news = [];
        }
      },
      error: (err) => {
        console.error('Error al cargar noticias:', err);
      },
    });
  }
}
