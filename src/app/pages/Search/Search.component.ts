import { Component } from '@angular/core';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { BottomNavComponent } from '../../component/bottom-nav/bottom-nav.component';
import { CardStackComponent } from '../../component/CardStack/card-stack.component';

@Component({
  selector: 'app-Search',
  standalone: true,
  imports: [SidebarComponent, BottomNavComponent,CardStackComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class searchComponent {}
