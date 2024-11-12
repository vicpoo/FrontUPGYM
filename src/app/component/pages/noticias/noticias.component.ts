import { Component } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { HeaderComponent } from '../../header/header.component';
import { NewsCardComponent } from '../../news-card/news-card.component';
import { BottomNavComponent } from '../../bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, NewsCardComponent, BottomNavComponent],
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent {}
