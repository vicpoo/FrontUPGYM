import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiasService } from '../../services/noticias.service';
import { News } from '../../interfaces/news';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-card-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-stack.component.html',
})
export class CardStackComponent implements OnInit {
  news: News[] = []; // Noticias secundarias
  featuredNews: News | null = null; // Noticia destacada

  constructor(private noticiasService: NoticiasService, private router: Router) {}

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

  // Navegar a la vista de detalle de la noticia
  navigateToDetail(newsId: number | null | undefined): void {
    if (newsId) {
      this.router.navigate(['/noticia-detalle', newsId]);
    } else {
      console.error('ID de noticia inválido:', newsId);
    }
  }
}
