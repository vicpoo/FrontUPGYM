import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { ActivatedRoute } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';
import { News } from '../../interfaces/news';

@Component({
  selector: 'app-noticia-detalle',
  standalone: true,
  imports: [CommonModule], // Add CommonModule for Angular directives
  templateUrl: './noticia-detalle.component.html',
})
export class NoticiaDetalleComponent implements OnInit {
  noticia: News | null = null;

  constructor(
    private route: ActivatedRoute,
    private noticiasService: NoticiasService
  ) {}

  ngOnInit(): void {
    this.loadNoticia();
  }

  // Load a specific news item by ID
  loadNoticia(): void {
    const noticiaId = this.route.snapshot.paramMap.get('id'); // Get the ID from the route
    if (noticiaId) {
      this.noticiasService.getNoticiaById(+noticiaId).subscribe({
        next: (data: News) => {
          this.noticia = data;
        },
        error: (err: any) => {
          console.error('Error al cargar la noticia:', err);
        },
      });
    }
  }
}
