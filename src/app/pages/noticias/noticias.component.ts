import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router } from '@angular/router';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { BottomNavComponent } from '../../component/bottom-nav/bottom-nav.component';
import { CardStackComponent } from '../../component/CardStack/card-stack.component';
import { NoticiasService } from '../../services/noticias.service';
import { News } from '../../interfaces/news';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    BottomNavComponent,
    CardStackComponent,
  ],
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'],
})
export class NoticiasComponent implements OnInit {
  newsList: News[] = []; // News list to store fetched news items

  constructor(private router: Router, private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.loadNews(); // Fetch news on component initialization
  }

  // Fetch news from the service and populate the newsList
  loadNews(): void {
    this.noticiasService.getNoticias().subscribe({
      next: (news) => {
        // Ensure each news item has a valid ID
        this.newsList = news.map((item) => ({
          ...item,
          id: item.id ?? 0, // Assign a default value if id is undefined
        }));
      },
      error: (err) => {
        console.error('Error loading news:', err);
      },
    });
  }

  // Navigate to the detail view of a specific news item
  navigateToDetail(newsId: number | null | undefined): void {
    if (newsId) {
      this.router.navigate(['/noticia-detalle', newsId]);
    } else {
      console.error('Invalid news ID:', newsId);
    }
  }
}
