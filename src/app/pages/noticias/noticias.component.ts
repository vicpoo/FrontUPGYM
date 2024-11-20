import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { BottomNavComponent } from '../../component/bottom-nav/bottom-nav.component';
import { CardStackComponent } from '../../component/CardStack/card-stack.component';
import { NoticiasService } from '../../services/noticias.service';
import { News } from '../../interfaces/news';
import { PremiumComponent } from '../../component/premium/premium.component'; // Ajusta la ruta según la ubicación

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    BottomNavComponent,
    CardStackComponent,
    PremiumComponent, // Importa el componente premium
  ],
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'],
})
export class NoticiasComponent implements OnInit {
  newsList: News[] = []; // Lista de noticias
  showPremium = false; // Controla la visibilidad del componente premium

  constructor(private router: Router, private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.loadNews(); // Carga las noticias al inicializar el componente
  }

  // Cargar noticias desde el servicio
  loadNews(): void {
    this.noticiasService.getNoticias().subscribe({
      next: (news) => {
        this.newsList = news.map((item) => ({
          ...item,
          id: item.id ?? 0,
        }));
        console.log(this.newsList); // Inspeccionar los datos cargados
      },
      error: (err) => {
        console.error('Error al cargar noticias:', err);
      },
    });
  }

// Mostrar el componente premium
showPremiumAd(): void {
  console.log('Click detected, showing premium ad');
  this.showPremium = true; // Mostrar el anuncio premium
}

onPremiumClosed(): void {
  this.showPremium = false; // Oculta el componente premium
}


}
