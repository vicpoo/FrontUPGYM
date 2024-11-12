import { Component } from '@angular/core';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { HeaderComponent } from '../../component/header/header.component';
import { BottomNavComponent } from '../../component/bottom-nav/bottom-nav.component';
import { CardStackComponent } from '../../component/CardStack/card-stack.component';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, BottomNavComponent,CardStackComponent],
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent {}
